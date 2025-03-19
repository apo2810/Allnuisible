<!DOCTYPE html>
<html class="wide wow-animation" lang="fr">
  <head>
    <!-- Site Title-->
    <title>Contacts</title>
    <meta name="format-detection" content="telephone=no">
    <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta charset="utf-8">
    <link rel="icon" href="images/favicon.ico" type="image/x-icon">
    <!-- Stylesheets-->
    <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,700;1,300&amp;family=Montserrat:wght@400;700&amp;display=swap">
    <link rel="stylesheet" href="css/bootstrap.css">
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/fonts.css">
  </head>
  <body>
    <div class="preloader">
      <div class="cssload-container">
        <div class="cssload-speeding-wheel"></div>
      </div>
    </div>
    <!-- Page-->
    <div class="page">
      <!-- Page header-->
      <header class="page-header">
        <!-- RD Navbar-->
        <header class="page-header">
          <nav class="navbar">
            <!-- Logo à gauche -->
            <div class="navbar-brand">
              <a href="index.html">
                <img src="images/Logo-allnuisibles.png" alt="Logo all'nuisible" class="logo">
              </a>
            </div>
        
            <!-- Bouton Menu Mobile -->
            <button class="menu-toggle">&#9776;</button>
        
            <!-- Menu à droite -->
            <ul class="navbar-menu">
              <!-- "Les Nuisibles" avec sous-catégories -->
              <li class="dropdown">
                <a href="nuisibles.html" class="dropdown-toggle">Les Nuisibles</a>
                <ul class="dropdown-menu">
                  <li><a href="nuisibles.html#rat">Rats/Souris</a></li>
                  <li><a href="nuisibles.html#blatte">Blattes (cafards)</a></li>
                  <li><a href="nuisibles.html#punaise">Punaises de lit</a></li>
                  <li><a href="nuisibles.html#guepe">Guêpes</a></li>
                  <li><a href="nuisibles.html#frelon">Frelons</a></li>
                  <li><a href="nuisibles.html#mouche">Mouches</a></li>
                  <li><a href="nuisibles.html#moustique">Moustiques</a></li>
                  <li><a href="nuisibles.html#oiseau">Oiseaux</a></li>
                  <li><a href="nuisibles.html#autres">Autres nuisibles</a></li>
                </ul>
              </li>
        
              <!-- "Nos Services" avec sous-catégories -->
              <li class="dropdown">
                <a href="services.html" class="dropdown-toggle">Nos Services</a>
                <ul class="dropdown-menu">
                  <li><a href="services.html#diagnostic">Diagnostic</a></li>
                  <li><a href="services.html#traitement">Traitement</a></li>
                  <li><a href="services.html#suvi">Suivi</a></li>
                </ul>
              </li>
        
              <!-- Lien Contact -->
              <li><a href="contacts.html">Contact</a></li>
            </ul>
          </nav>
        </header>
      <!--Google Map-->
      
      <section class="section-md bg-default section-contact">
        <div class="container-fluid"> <!-- Remplace "container" par "container-fluid" pour utiliser toute la largeur -->
          <div class="row">
            <div class="col-md-4 col-lg-4 contact-info-section"> <!-- Réduire un peu la largeur des infos -->
              <h4 class="heading-decorated">Nos coordonnées</h4>
              <ul class="list-sm contact-info">
                <li>
                  <dl class="list-terms-inline">
                    <dt>Adresse </dt>
                    <dd>19 rue Allard, Saint-Mandé 94160</dd>
                  </dl>
                </li>
                <li>
                  <dl class="list-terms-inline">
                    <dt>Téléphone </dt>
                    <dd>
                      <ul class="list-semicolon">
                        <li><a href="tel:0670914384">06 70 91 43 84</a></li>
                      </ul>
                    </dd>
                  </dl>
                </li>
                <li>
                  <dl class="list-terms-inline">
                    <dt>Nous sommes ouverts </dt>
                    <dd>Lundi - Vendredi : <br> 09h00-19h00</dd>
                  </dl>
                </li>
                <li>
                  <ul class="list-inline-sm">
                    <li><a class="icon-sm fa-facebook novi-icon icon" href="#"></a></li>
                    <li><a class="icon-sm fa-linkedin novi-icon icon" href="#"></a></li>
                    <li><a class="icon-sm fa-instagram novi-icon icon" href="#"></a></li>
                  </ul>
                </li>
              </ul>
            </div>
            <div class="col-md-8 col-lg-8 contact-form-section"> <!-- Augmenter la largeur du formulaire -->
              <h4 class="heading-decorated">Contactez-nous</h4>
              <form action="send_mail.php" method="POST">
                <div class="form-wrap form-wrap_icon linear-icon-man">
                  <input class="form-input" id="contact-name" type="text" name="name" placeholder="Votre nom" required>
                </div>
                <div class="form-wrap form-wrap_icon linear-icon-envelope">
                  <input class="form-input" id="contact-email" type="email" name="email" placeholder="Votre e-mail" required>
                </div>
                <div class="form-wrap form-wrap_icon linear-icon-feather">
                  <textarea class="form-input" id="contact-message" name="message" placeholder="Votre demande" required></textarea>
                </div>
                <div class="form-wrap form-validation-left">
                  <div class="recaptcha" id="captcha1" data-sitekey="6LfZlSETAAAAAC5VW4R4tQP8Am_to4bM3dddxkEt"></div>
                </div>
                <button class="button button-primary" type="submit">Envoyer</button>
              </form>
            </div>
          </div>
        </div>
        
      </section>

      <!-- Page Footer-->
      <footer class="pre-footer-corporate">
        <div class="container">
          <div class="row">
            
            <!-- Logo + Présentation -->
            <div class="footer-col col-lg-4">
              <a class="brand" href="index.html">
                <img src="images/Logo-allnuisibles.png" alt="Logo AllNuisibles" class="footer-logo"/>
              </a>
              <a href="index.html">
                <img src="images/certibiocide.png" alt="certibiocide" class="footer-logo secondary-logo"/>
              </a>
              <p>
                Grâce à des méthodes éprouvées et des équipements de pointe, nous éradiquons rapidement les intrus tout en assurant une protection durable de votre environnement.
                Notre expertise nous permet d’agir avec précision, en limitant au maximum l’impact sur votre quotidien.
              </p>
            </div>
      
            <!-- Navigation -->
            <div class="footer-col col-lg-4">
              <h6>Navigation</h6>
              <ul>
                <li><a href="services.html">Nos Services</a></li>
                <li><a href="contacts.html">Nous Contacter</a></li>
              </ul>
            </div>
      
            <!-- Contacts -->
            <div class="footer-col col-lg-4">
              <h6>Contacts</h6>
              <p><strong>Adresse :</strong> 19 rue Allard, Saint-Mandé 94160</p>
              <p><strong>Téléphone :</strong> <a href="tel:0670914384">06 70 91 43 84</a></p>
              <p><strong>Email :</strong> <a href="mailto:Allnuisibles@orange.fr">Allnuisibles@orange.fr</a></p>
              <p><strong>Nous sommes ouverts :</strong> Lundi - Vendredi : 09h00 - 17h00</p>
            </div>
      
          </div>
        </div>
      </footer>

      <footer class="footer-corporate bg-gray-darker">
        <div class="container">
          <div class="footer-corporate__inner">
            <p class="rights"><span>© All'nuisibles</span><span>&nbsp;</span><span class="copyright-year"></span>. Tous droits réservés</p>
            <ul class="list-inline-xxs">
              <li><a class="icon icon-xxs icon-gray-darker fa fa-facebook" href="#"></a></li>
              <li><a class="icon icon-xxs icon-gray-darker fa fa-linkedin" href="#"></a></li>
              <li><a class="icon icon-xxs icon-gray-darker fa fa-instagram" href="#"></a></li>
            </ul>
          </div>
        </div>
      </footer>
      <!-- 📌 Pop-up de confirmation -->
      <div id="popup-confirmation" class="popup">
          <div class="popup-content">
              <span class="close-popup">&times;</span>
              <p>Votre message a bien été envoyé. Merci !</p>
              <button onclick="closePopup()">OK</button>
          </div>
      </div>

  <!-- Vendor JS Files -->
  <script src="assets/javascripts/jquery.min.js"></script>
  <script src="assets/vendor/glightbox/js/glightbox.min.js"></script>
  <script src="assets/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>
  <script src="assets/vendor/aos/aos.js"></script>
  <script src="assets/vendor/swiper/swiper-bundle.min.js"></script>
  <script src="assets/javascripts/plugins.js"></script>
  <script src="assets/javascripts/purecounter_vanilla.js"></script>
  <script src="assets/javascripts/validator.min.js"></script>
  <script src="assets/javascripts/contactform.js"></script>
  <script src="assets/javascripts/particles.min.js"></script>
  <script src="assets/javascripts/script.js"></script>

  <!-- Template Main JS File -->
  <script src="assets/javascripts/main.js"></script>
    <!-- Global Mailform Output-->
    <div class="snackbars" id="form-output-global"></div>
    <!-- Javascript-->
    <script src="js/core.min.js"></script>
    <script src="js/script.js"></script>
    

    <!-- coded by Ragnar-->
    <?php
    if (isset($_POST['message'])) {
        $entete  = 'MIME-Version: 1.0' . "\r\n";
        $entete .= 'Content-type: text/html; charset=utf-8' . "\r\n";
        $entete .= 'From: allnuisibles.com' . "\r\n";
        $entete .= 'Reply-to: ' . $_POST['email'];

        $message = '<h1>Message envoyé depuis la page Contact de Allnuisibles</h1>
        <p><b>Email : </b>' . $_POST['email'] . '<br>
        <p><b>nom : </b>' . $_POST['name'] . '<br>
        <b>Message : </b>' . htmlspecialchars($_POST['message']) . '</p>';

        $retour = mail('apolline.fert@gmail.com', 'Envoi depuis page Contact', $message, $entete);
        if($retour)
            echo '<p>Votre message a bien été envoyé.</p>';
    }
    ?>
  </body>
</html>