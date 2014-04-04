$(document).ready(function()
{
	$('.atooltip').on('mousedown',function(e) // quand on clique sur un element de classe "atooltip"
	{
		var elem = $(this); // copier cet objet de classe "atootip" dans la variable "elem"
		var event = e; // copier l'evenement dans la variable "event"
		
		/*
			L'action que nous allons faire (afficher la boite à outils), ne doit s'executer qu'au bout d'un certain temps.
			Et si on relache la souris avant que ce temps ne soit écoulé, la boite à outil ne devra pas s'afficher.
			Si l'élément est un lien il faudra que le lien s'exécute normlement.
			Nous initialisons donc un timer que nous sauvegardons dans la variable "a" (nom arbirtraire)
		*/
		var a = setTimeout(function()
		{
			/*
				Le code qui suit ne n'executera donc qu'au bout d'un certain (puisque nous sommes dans un setTimeout)
				Ce temps a été fixé (arbitrairement encore) à 1s (1000ms)
			*/
			
			/*
				POSITIONNEMENT DE LA BOITE A OUTIL PAR RAPPORT A LA SOURIS
				Dans cette partie de code on récupère la posiiton de la souris par rapport à l'émément
				sur lequel nous avons cliqué.
				Cruement, les coordonnées de la souris sont event.pageX, event.pageY
				En fonction de l'endroit où la boite à outil doit s'afficher, ce calcul peut être
				inutile.
				
				Dans cet exemple, on fait en sorte que les bords de la boite à outil soit à égales distances de la souris sur l'axe horizontal
				et qu'elle se trouve 45 pixels au dessus du pointeur de la souris.
				(La boite à outil doit donc être en position absolute)
			*/
			var x = event.pageX-(event.pageX/4);
			var y = event.pageY-(45)-(elem.next( ".helpbox" ).height());
			elem.next( ".helpbox" ).css({
				top: y,
				left: x
			});
			
			/*
				DESACTIVER LE LIEN SI LE CLIC S'EST FAIT SUR UNE ANCRE
			*/
			if(elem.get(0).tagName == "A") // si l'élément est une balise A
			{
				elem.attr('nohref', elem.attr('href')); // créer l'attribut "nohref" et y stocker la valeur de href=""
				elem.removeAttr('href'); // supprimer l'attribut href
			}
			
			elem.next( ".helpbox" ).fadeToggle(500); // afficher ou masquer la boite à outils effet un effet de fondu qui dure 500ms
		},
		1000);
		
		/*
			QUAND ON RELACHE LA SOURIS
		*/
		$('a').on('mouseup', function(e)
		{
			if(elem.get(0).tagName == "A") // si l'element sur lequel nous avions cliqué était une balise A
			{
				/*
					Nous allons rétablir le lien qu'il contenait (celui que nous avions supprimé)
					mais nous devons éviter de le rétablir au moment du "mouseup" sinon ca revient à avoir cliquer sur le lien
					comme pour le consulter.
					Nous allons donc injecter un retard au rétablissement du lien de sorte que au moment ou on relache la souris
					(après le clic prolongé), le lien ne se rétablissement qu'après qu'on ait relaché la souris.
					On utilise donc un nouveaux timer
				*/
				var b = setTimeout(function()
				{
					// les actions dans ces accolades ne s'excuteront qu'au bout d'un certain temps (ici 500ms)
					elem.attr('href', elem.attr('nohref')); // créer l'attribut "href" sr notre element et lui donner la valeur de "nohref" que nous avions créer plus tot.
					elem.removeAttr('nohref'); // supprimer l'attribut nohref
					clearTimeout(b); // supprimer le timer b (le timer s'efface lui même)
				},
				500);
			}
			
			clearTimeout(a); // supprimer le timer que nous avions sauvegarder dans la variable "a"
		});
	});
	
	
	/*
		Pour résumé:
			Au clic sur un element on declanche un timer a au bout duquel
				on affichera une tooltip
				on supprimera le lien sur cet element
			
			Au relachement du clic
				si on a relaché avant la fin du timer a
					faire ce qui est prévu par défaut quand on clic sur l'element
				sinon
					retablir le lien sur cet element après le relachement
					
	*/
	
	
	
	/*
			BONUS (ceci fonctionne sur tout mais pas sur les balises a)
			tooltip au double clique sur un element qui n'est pas une ancre
	*/
	
	$('.have_helpbox').dblclick(function(event) // au double clique
	{
		var x = event.pageX-(event.pageX/4);
		var y = event.pageY-(45)-($(this).next( ".helpbox" ).height());
		$(this).next( ".helpbox" ).css({
			top: y,
			left: x
		}); // positionner la boite à outils
		$(this).next( ".helpbox" ).fadeToggle(500); // faire apparaitre ou disparaitre la boite à outils avec un effet de fondu qui dure 500ms
	});
	
	
	/*
		Conseils d'utilisation:
		
		Integrez ce code dans une balise script au plus bas de votre page html
		Les liens qui doivent être affecté par le script doivent avoir la classe "atootip"
		Tout les autres element qui doivent être affectés par le script doivent avoir la classe "have_tooltip"
		
		Chaque boite à outil doit avoir la classe "helpbox" (à moins de modifier le script)
		Chaque boite à outil doit se trouver dans le même conteneur et juste après l'élément auquel il est associé (important)
		Dans votre css, la classe "helpbox" doit être en position absolute et display none
	
	*/
	
	
});
