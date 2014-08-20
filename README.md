atooltip
========

Une boite à outils qui s'affiche lors du clic sur les liens.


Conseils d'utilisation:
========

Intégrez ce code dans une balise script au plus bas de votre page html
Les élément qui doivent être affectés doivent avoir la classe "have_helpbox"

Chaque boite à outil doit avoir la classe "helpbox"
Chaque boite à outil doit se trouver dans le même conteneur et juste après l'élément auquel il est associé (important)
Dans votre css, la classe "helpbox" doit être en position absolute et display none

Vous pouvez ajouter un bouton de fermeture de la boite de dialogue en lui donnant la classe "close".
Ce bouton doit avoir comme parent l'élément de classe "helpbox qu'il est censé fermer.
