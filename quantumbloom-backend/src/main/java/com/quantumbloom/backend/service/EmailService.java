package com.quantumbloom.backend.service;

import org.springframework.stereotype.Service;

@Service
public class EmailService {

    /*
    // Servicio preparado para enviar correos electrónicos (deshabilitado para entorno local)
    // Requiere configuración SMTP en application.properties y una cuenta válida (como Gmail o Mailtrap)

    @Autowired
    private JavaMailSender mailSender;

    public void sendReservationConfirmation(String toEmail, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject(subject);
        message.setText(body);

        mailSender.send(message);
        System.out.println("Correo enviado a: " + toEmail);
    }
    */
}
