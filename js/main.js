const header_background = document.querySelector('.header_background');
const smooth_scroll_links = document.querySelectorAll('.smooth_scroll');

smooth_scroll_links.forEach(function(e) {
  e.addEventListener('click', smooth_scroll);
});

function smooth_scroll(e) {
  e.preventDefault();
  const link = e.currentTarget;
  
  //substring(1) removes the first # character from the string
  let href = link.getAttribute('href').substring(1);
  
  const target = document.getElementById(href);
  console.log(href);
    
  //this just adds the hash to the URL, as you would normaly expect from clicking a hash link
  window.history.pushState("new url", "Castle Coding", link.getAttribute('href'));
  
  target.scrollIntoView({
    block: 'start',
    behavior: 'smooth',
  });
}

function scrollStuff() {
    /*
    Adding cool parallax effects to the header background
    Also adding a fadeout, because that it pretty sweet
    */

    const windowScrolltop = window.scrollY;
    const map_mapparallax = document.querySelector('.map_parallax');
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
        header_background.style.opacity = 1;
    }

    //console.log(windowScrolltop, header_background.clientHeight);

}



window.addEventListener('scroll', scrollStuff);

