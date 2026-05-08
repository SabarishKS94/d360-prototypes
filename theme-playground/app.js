document.addEventListener('DOMContentLoaded', () => {

// Theme toggle
document.getElementById('toggle-theme').addEventListener('click', () => {
    document.body.classList.toggle('cosmos-dark');
    document.body.classList.toggle('cosmos-light');
});

// Token panel toggle
document.getElementById('toggle-panel').addEventListener('click', () => {
    document.getElementById('token-panel').classList.toggle('hidden');
});

// Modal
document.getElementById('open-modal').addEventListener('click', () => {
    document.getElementById('modal-backdrop').classList.add('open');
});
document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('modal-backdrop').classList.remove('open');
});
document.getElementById('cancel-modal').addEventListener('click', () => {
    document.getElementById('modal-backdrop').classList.remove('open');
});
document.getElementById('modal-backdrop').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        e.currentTarget.classList.remove('open');
    }
});

// Dropdown
const dropdownTrigger = document.getElementById('dropdown-trigger');
const dropdownMenu = document.getElementById('dropdown-menu');
dropdownTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdownMenu.classList.toggle('open');
});
document.addEventListener('click', () => {
    dropdownMenu.classList.remove('open');
});

// Toast close buttons
document.querySelectorAll('.toast-close').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.parentElement.style.display = 'none';
    });
});

// Token editor
const controls = document.getElementById('token-controls');

const editableTokens = [
    { section: 'Background', tokens: [
        { label: '--bg-gradient', type: 'text' },
        { label: '--glow-color', type: 'text' },
    ]},
    { section: 'Surfaces', tokens: [
        { label: '--surface-bg', type: 'text' },
        { label: '--surface-border', type: 'text' },
        { label: '--surface-blur', type: 'text' },
    ]},
    { section: 'Text', tokens: [
        { label: '--text-primary', type: 'text' },
        { label: '--text-secondary', type: 'text' },
        { label: '--text-muted', type: 'text' },
    ]},
    { section: 'Buttons', tokens: [
        { label: '--btn-brand-bg', type: 'color' },
        { label: '--btn-brand-hover', type: 'color' },
        { label: '--btn-success-bg', type: 'color' },
        { label: '--btn-destructive-bg', type: 'color' },
        { label: '--btn-neutral-bg', type: 'text' },
        { label: '--btn-neutral-border', type: 'text' },
    ]},
    { section: 'Inputs', tokens: [
        { label: '--input-bg', type: 'text' },
        { label: '--input-border', type: 'text' },
        { label: '--input-focus-border', type: 'text' },
    ]},
    { section: 'Badges', tokens: [
        { label: '--badge-success-bg', type: 'text' },
        { label: '--badge-success-text', type: 'color' },
        { label: '--badge-error-bg', type: 'text' },
        { label: '--badge-error-text', type: 'color' },
    ]},
    { section: 'Toast', tokens: [
        { label: '--toast-success-bg', type: 'text' },
        { label: '--toast-success-text', type: 'color' },
        { label: '--toast-error-bg', type: 'text' },
        { label: '--toast-error-text', type: 'color' },
    ]},
    { section: 'Layout', tokens: [
        { label: '--radius', type: 'text' },
        { label: '--radius-sm', type: 'text' },
        { label: '--blur-heavy', type: 'text' },
        { label: '--blur-medium', type: 'text' },
    ]},
    { section: 'Accent', tokens: [
        { label: '--accent-color', type: 'color' },
    ]},
];

function getCurrentValue(prop) {
    return getComputedStyle(document.body).getPropertyValue(prop).trim();
}

function rgbToHex(rgb) {
    if (rgb.startsWith('#')) return rgb;
    const match = rgb.match(/\d+/g);
    if (!match || match.length < 3) return '#000000';
    return '#' + match.slice(0, 3).map(n => parseInt(n).toString(16).padStart(2, '0')).join('');
}

editableTokens.forEach(({ section, tokens }) => {
    const sectionEl = document.createElement('div');
    sectionEl.style.marginBottom = '16px';
    const heading = document.createElement('div');
    heading.textContent = section;
    heading.style.cssText = 'font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: var(--text-subtle); margin-bottom: 8px; padding-top: 8px; border-top: 1px solid var(--nav-border);';
    sectionEl.appendChild(heading);

    tokens.forEach(({ label, type }) => {
        const group = document.createElement('div');
        group.className = 'token-group';

        const lbl = document.createElement('label');
        lbl.textContent = label;
        group.appendChild(lbl);

        if (type === 'color') {
            const colorInput = document.createElement('input');
            colorInput.type = 'color';
            colorInput.value = rgbToHex(getCurrentValue(label));
            const textInput = document.createElement('input');
            textInput.type = 'text';
            textInput.value = getCurrentValue(label);

            colorInput.addEventListener('input', (e) => {
                document.body.style.setProperty(label, e.target.value);
                textInput.value = e.target.value;
            });
            textInput.addEventListener('change', (e) => {
                document.body.style.setProperty(label, e.target.value);
                colorInput.value = rgbToHex(e.target.value);
            });

            group.appendChild(colorInput);
            group.appendChild(textInput);
        } else {
            const textInput = document.createElement('input');
            textInput.type = 'text';
            textInput.value = getCurrentValue(label);
            textInput.style.width = '100%';
            textInput.addEventListener('change', (e) => {
                document.body.style.setProperty(label, e.target.value);
            });
            group.appendChild(textInput);
        }

        sectionEl.appendChild(group);
    });

    controls.appendChild(sectionEl);
});

// Export tokens to clipboard (⌘E)
document.addEventListener('keydown', (e) => {
    if (e.metaKey && e.key === 'e') {
        e.preventDefault();
        const mode = document.body.classList.contains('cosmos-dark') ? '.cosmos-dark' : '.cosmos-light';
        const lines = [];
        editableTokens.forEach(({ tokens }) => {
            tokens.forEach(({ label }) => {
                const val = getComputedStyle(document.body).getPropertyValue(label).trim();
                if (val) lines.push(`    ${label}: ${val};`);
            });
        });
        const output = `${mode} {\n${lines.join('\n')}\n}`;
        navigator.clipboard.writeText(output).then(() => {
            const hint = document.querySelector('.panel-hint');
            const orig = hint.textContent;
            hint.textContent = '✓ Copied to clipboard!';
            setTimeout(() => { hint.textContent = orig; }, 2000);
        });
    }
});

// Plan builder step clicks
document.querySelectorAll('.pb-step').forEach(step => {
    step.addEventListener('click', () => {
        if (step.classList.contains('disabled')) return;
        document.querySelectorAll('.pb-step').forEach(s => s.classList.remove('active'));
        step.classList.add('active');
    });
});

// Plan builder divider — click to collapse/expand sidebar
const pbDivider = document.querySelector('.pb-divider');
const pbSidebar = document.querySelector('.plan-builder-sidebar');
if (pbDivider && pbSidebar) {
    pbDivider.addEventListener('click', () => {
        pbSidebar.classList.toggle('collapsed');
        pbDivider.classList.toggle('collapsed');
    });
}

}); // end DOMContentLoaded
