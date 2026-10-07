/**
 * Anteprima live: a ogni modifica nell'editor (campi ACF, titolo, contenuto) invia lo stato NON salvato al
 * frontend Next dentro un iframe, via postMessage. Funziona sia con Gutenberg sia con l'editor classico.
 *
 * Messaggio inviato all'iframe:
 *   { source: 'aletheia-wp', type: 'preview',
 *     payload: { postId, postType, kind: 'content'|'options', title, content, acf{ nome: valore formattato } } }
 * Il frontend ascolta SOLO se event.origin === origine di WordPress (vedi README, "Contratto frontend").
 * L'iframe, quando è pronto, risponde { source: 'aletheia-next', type: 'ready' } e riceve subito lo stato corrente.
 */
(function () {
	const cfg = window.ALETHEIA_PREVIEW;
	if (!cfg || !window.acf) return;
	const frontendOrigin = new URL(cfg.frontendUrl).origin;

	// ── Pannello affiancato all'editor ──────────────────────────────────────
	const panel = document.createElement('aside');
	panel.id = 'aletheia-live';
	panel.innerHTML =
		'<header><strong>Anteprima live</strong>' +
		'<span class="al-vp"><button data-w="100%" class="on">Desktop</button><button data-w="768px">Tablet</button><button data-w="390px">Mobile</button></span>' +
		'<span class="al-status" aria-live="polite">in attesa…</span></header>' +
		'<div class="al-frame"><iframe title="Anteprima sito"></iframe></div>';
	document.body.appendChild(panel);
	const iframe = panel.querySelector('iframe');
	iframe.src = cfg.iframeSrc;
	const status = panel.querySelector('.al-status');

	const toggle = document.createElement('button');
	toggle.type = 'button';
	toggle.id = 'aletheia-live-toggle';
	toggle.textContent = 'Anteprima live';
	toggle.onclick = () => document.body.classList.toggle('aletheia-live-open');
	document.body.appendChild(toggle);
	document.body.classList.add('aletheia-live-open');

	panel.querySelectorAll('.al-vp button').forEach((b) => {
		b.onclick = () => {
			panel.querySelectorAll('.al-vp button').forEach((x) => x.classList.remove('on'));
			b.classList.add('on');
			iframe.style.width = b.dataset.w;
		};
	});

	// ── Raccolta stato corrente ─────────────────────────────────────────────
	const gb = () => (window.wp && wp.data && wp.data.select('core/editor')) || null; // null nell'editor classico
	const SKIP = ['tab', 'message', 'accordion'];

	function collectFields() {
		const out = {};
		acf.getFields().forEach((f) => {
			if (SKIP.includes(f.get('type'))) return;
			out[f.get('name')] = { key: f.get('key'), value: f.val() };
		});
		return out;
	}
	function collectTitle() {
		const e = gb();
		if (e) return e.getEditedPostAttribute('title') || '';
		const t = document.getElementById('title');
		return t ? t.value : '';
	}
	function collectContent() {
		const e = gb();
		if (e) return e.getEditedPostContent() || '';
		const ed = window.tinymce && tinymce.get('content');
		if (ed && !ed.isHidden()) return ed.getContent();
		const c = document.getElementById('content');
		return c ? c.value : '';
	}

	let ready = false;
	let seq = 0;

	async function push() {
		const mine = ++seq;
		const title = collectTitle();
		status.textContent = 'aggiornamento…';
		try {
			// Il server formatta i valori come farebbe il salvataggio (immagini -> {url,...}, link -> {url,title,target}).
			const res = await wp.apiFetch({
				path: '/aletheia/v1/preview-fields',
				method: 'POST',
				data: { fields: collectFields(), title, content: collectContent() },
			});
			if (mine !== seq) return; // risposta superata da una modifica più recente
			iframe.contentWindow.postMessage(
				{
					source: 'aletheia-wp',
					type: 'preview',
					payload: {
						postId: Number(cfg.postId), // wp_localize_script converte i numeri in stringhe
						postType: cfg.postType,
						kind: cfg.isOptions ? 'options' : 'content',
						title: res.title,
						content: res.content,
						acf: res.acf,
					},
				},
				frontendOrigin
			);
			status.textContent = 'aggiornata';
		} catch (e) {
			status.textContent = 'errore anteprima';
		}
	}

	// Debounce: si aggiorna ~300ms dopo l'ultima digitazione.
	let timer;
	const schedule = () => {
		clearTimeout(timer);
		timer = setTimeout(() => ready && push(), 300);
	};

	window.addEventListener('message', (e) => {
		if (e.origin !== frontendOrigin || !e.data || e.data.source !== 'aletheia-next') return;
		if (e.data.type === 'ready') {
			ready = true;
			push();
		}
	});

	// Campi ACF, titolo e contenuto dell'editor classico.
	const inForm = (t) => t && t.closest && t.closest('.acf-fields, #titlediv, #postdivrich');
	document.addEventListener('input', (e) => inForm(e.target) && schedule());
	document.addEventListener('change', (e) => inForm(e.target) && schedule());
	// Editor visuale (TinyMCE) dei campi WYSIWYG e del contenuto classico.
	acf.addAction('wysiwyg_tinymce_init', (ed) => ed.on('keyup change', schedule));
	if (window.jQuery) jQuery(document).on('tinymce-editor-init', (_e, ed) => ed.on('keyup change', schedule));
	// Selezione immagini/link/relazioni: ACF emette 'change' via jQuery, non sempre via DOM.
	acf.addAction('append', schedule);
	if (window.jQuery) jQuery(document).on('change', '.acf-field', schedule);

	// Gutenberg: titolo e contenuto (corso, news, offerta).
	if (gb()) {
		let lastTitle, lastContent;
		wp.data.subscribe(() => {
			const t = collectTitle();
			const c = collectContent();
			if (t !== lastTitle || c !== lastContent) {
				lastTitle = t;
				lastContent = c;
				schedule();
			}
		});
	}
})();
