$("#glide_test").glide({
    type: "carousel",
    autoheight: true
});


/*
Hidden ligger med från start på vissa objekt för att förhindra att man ser det innan glide har startats.
Nu när glide är startad så kan hidden tas bort från dessa objekt.
*/
$('.glide__arrows').removeClass('hidden');
$('.glide__slide').removeClass('hidden');