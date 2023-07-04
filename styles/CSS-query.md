CSS: 'not' in media query has some uses

/* max-md	@media not all and (min-width: 768px) { ... } */
@media not (all and (min-width: 768px)){ /* equals @media all and (max-width: 767px)*/
    766
    767
}

@media (min-width: 768px) {  
    768
    769
}

@media all and (max-width: 768px) {
    767
    768
}