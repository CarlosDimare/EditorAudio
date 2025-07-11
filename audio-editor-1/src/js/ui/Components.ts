// src/js/ui/Components.ts

export class Button {
    constructor(private label: string, private onClick: () => void) {}

    render(): HTMLButtonElement {
        const button = document.createElement('button');
        button.textContent = this.label;
        button.addEventListener('click', this.onClick);
        return button;
    }
}

export class Slider {
    constructor(private min: number, private max: number, private onChange: (value: number) => void) {}

    render(): HTMLInputElement {
        const slider = document.createElement('input');
        slider.type = 'range';
        slider.min = this.min.toString();
        slider.max = this.max.toString();
        slider.addEventListener('input', () => this.onChange(Number(slider.value)));
        return slider;
    }
}

export class Label {
    constructor(private text: string) {}

    render(): HTMLLabelElement {
        const label = document.createElement('label');
        label.textContent = this.text;
        return label;
    }
}