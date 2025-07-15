document.addEventListener('DOMContentLoaded', function () {
    const interactiveHereoBlocks = document.querySelectorAll('.wp-block-ntbs-interactive-hero');
    if (interactiveHereoBlocks.length > 0) {
        interactiveHereoBlocks.forEach(block => {
            const expandCollapseButton = block.querySelector('#expand-collapse');
            const tickerContent = block.querySelector('.ticker-text-seamless');

            if (expandCollapseButton && tickerContent) {
                expandCollapseButton.addEventListener('click', () => {
                    tickerContent.classList.toggle('expanded');
                    expandCollapseButton.classList.toggle('expanded');
                });
            }
        });
    }
});
