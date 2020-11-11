function getTemplateContent(template: HTMLTemplateElement): HTMLElement {
    return template.content.cloneNode(true) as HTMLElement;
}

export default getTemplateContent