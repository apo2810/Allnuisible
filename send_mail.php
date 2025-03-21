<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Adresse email où envoyer les messages
    $to = "Allnuisibles@orange.fr"; 
    
    // Sécurisation des entrées
    $email = filter_var($_POST['email'], FILTER_SANITIZE_EMAIL);
    $name = htmlspecialchars($_POST['name']);
    $messageContent = htmlspecialchars($_POST['message']);

    // Vérifier si l'email est valide
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["status" => "error", "message" => "L'adresse e-mail n'est pas valide."]);
        exit;
    }

    // Sujet du mail
    $subject = "Nouveau message de contact - Allnuisibles";

    // Corps du message
    $message = "
    <html>
    <head>
        <title>Message de contact - Allnuisibles</title>
    </head>
    <body>
        <h2>Nouveau message reçu depuis le formulaire de contact</h2>
        <p><strong>Nom :</strong> $name</p>
        <p><strong>Email :</strong> $email</p>
        <p><strong>Message :</strong></p>
        <p>$messageContent</p>
    </body>
    </html>";

    // En-têtes du mail
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: $email" . "\r\n";
    $headers .= "Reply-To: $email" . "\r\n";
    
    // Envoi de l'email
    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(["status" => "success", "message" => "Votre message a bien été envoyé."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Erreur lors de l'envoi du message."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Accès non autorisé."]);
}
?>