/* Insert cool JavaScript here */
console.log('Castle Coding for the win 🦄');

window.addEventListener('scroll', scrollStuff);

function scrollStuff() {
    /*
    Adding cool parallax effects to the header background
    Also adding a fadeout, because that it pretty sweet
    */

    const windowScrolltop = window.scrollY;
    const header_background = document.querySelector('.header_background');
    const transformValue = (windowScrolltop / 2);
    const opacityValue = 1 - (windowScrolltop / 400);

    if (windowScrolltop > 1) {
        /*
        Only apply if windowScrolltop is more than 1, this is to prevent mobile "pull to refresh" thing to look wierd
        */
        header_background.style.transform = 'translateY('+transformValue+'px)';
        header_background.style.opacity = opacityValue;
    } else {
        header_background.style.transform = 'translateY(0px)';
        header_background.style.opacity = 0;
    }

}