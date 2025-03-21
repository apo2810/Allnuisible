<?php
file_put_contents("debug.txt", "Script exécuté\n", FILE_APPEND);
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Adresse email de réception
    $to = "apolline.fert@gmail.com"; 

    // Récupération et sécurisation des champs
    $name = htmlspecialchars($_POST['name'] ?? '');
    $email = filter_var($_POST['email'] ?? '', FILTER_SANITIZE_EMAIL);
    $phone = htmlspecialchars($_POST['phone'] ?? '');
    $nuisible = htmlspecialchars($_POST['nuisible'] ?? '');
    $code_postal = htmlspecialchars($_POST['code_postal'] ?? '');
    $type_lieu = htmlspecialchars($_POST['type_lieu'] ?? '');

    // Vérifier que tous les champs obligatoires sont remplis
    if (empty($name) || empty($email) || empty($phone) || empty($nuisible) || empty($code_postal) || empty($type_lieu)) {
        echo json_encode(["status" => "error", "message" => "Tous les champs sont requis."]);
        exit;
    }

    // Vérifier si l'email est valide
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["status" => "error", "message" => "L'adresse e-mail n'est pas valide."]);
        exit;
    }

    // Sujet du mail
    $subject = "Demande de devis - Allnuisibles";

    // Contenu du mail en HTML
    $message = "
    <html>
    <head>
        <title>Demande de devis - Allnuisibles</title>
    </head>
    <body>
        <h2>Nouvelle demande de devis reçue</h2>
        <p><strong>Nom :</strong> $name</p>
        <p><strong>Email :</strong> $email</p>
        <p><strong>Téléphone :</strong> $phone</p>
        <p><strong>Nuisible :</strong> $nuisible</p>
        <p><strong>Lieu :</strong> $type_lieu</p>
        <p><strong>Code Postal :</strong> $code_postal</p>
    </body>
    </html>";

    // En-têtes du mail
    $headers = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8\r\n";
    $headers .= "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Envoi de l'email
    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(["status" => "success", "message" => "Votre demande de devis a bien été envoyée."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Erreur lors de l'envoi du message."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Méthode non autorisée."]);
}
?>
