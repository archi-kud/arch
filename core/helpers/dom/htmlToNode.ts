function htmlToNode(html: string): HTMLElement | null {
    const template = document.createElement('template');

    template.innerHTML = html;

    return template.content.firstChild as HTMLElement;
}

export default htmlToNode;