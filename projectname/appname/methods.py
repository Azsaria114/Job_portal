from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
import hashlib
import smtplib


def encrypt_password(raw_password):
    salt = hashlib.sha256()
    salt.update(raw_password.encode('utf-8'))
    salt_bytes = salt.digest()

    hashed_password = hashlib.sha256()
    hashed_password.update(raw_password.encode('utf-8') + salt_bytes)
    hashed_password_bytes = hashed_password.digest()

    return hashed_password_bytes.hex()


def send_email( to_email, email_subject, email_body):
    sender_email = 'susiazsaria.25cs@licet.ac.in'
    sender_password = 'lordineedu'

    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = to_email
    msg['Subject'] = email_subject
    body = email_body
    msg.attach(MIMEText(body, 'plain'))
    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender_email, sender_password)
        server.sendmail(sender_email, to_email, msg.as_string())
        server.quit()
    except Exception as e:
        print(f"Error sending email: {str(e)}")
        raise  Exception(f"Error sending email: {str(e)}")