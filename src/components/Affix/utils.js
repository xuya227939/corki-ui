export function getTargetRect(target) {
    return target !== window ? target.getBoundingClientRect() : { top: 0, bottom: window.innerHeight };
}

export function getFixedTop(placeholderReact, targetRect, offsetTop) {
    if (offsetTop !== undefined && targetRect.top > placeholderReact.top - offsetTop) {
        return offsetTop + targetRect.top;
    }
    return undefined;
}