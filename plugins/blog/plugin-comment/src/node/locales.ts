import type { DefaultLocaleInfo } from '@vuepress/helper'
import type { WalineLocaleData } from '../shared/index.js'

/**
 * Default locale info for Waline
 */
export const walineLocalesInfo: DefaultLocaleInfo<WalineLocaleData> = [
  [
    ['en', 'en-US'],
    {
      placeholder:
        'Write a comment here (Fill in the email address to receive an email notification when being replied)',
    },
  ],
  [
    ['zh', 'zh-CN', 'zh-Hans'],
    { placeholder: '请留言。(填写邮箱可在被回复时收到邮件提醒)' },
  ],
  [
    ['zh-TW', 'zh-Hant'],
    { placeholder: '請留言。(填寫信箱可在被回覆時收到郵件提醒)' },
  ],
  [
    ['de', 'de-DE'],
    {
      placeholder:
        'Schreibe ein Kommentar (Geben Sie die E-Mail-Adresse ein, um eine E-Mail-Benachrichtigung zu erhalten, wenn Sie eine Antwort erhalten)',
    },
  ],
  [
    ['vi', 'vi-VN'],
    {
      placeholder:
        'Để lại bình luận (Điền địa chỉ email để nhận email thông báo khi được trả lời)',
    },
  ],
  [
    ['uk', 'uk-UA'],
    {
      placeholder:
        'Напишіть тут коментар (введіть адресу електронної пошти, щоб отримувати сповіщення електронною поштою, коли буде відповідь)',
    },
  ],
  [
    ['ru', 'ru-RU'],
    {
      placeholder:
        'Напишите комментарий здесь (Введите адрес электронной почты, чтобы получить уведомление по электронной почте при ответе)',
    },
  ],
  [
    ['br', 'br-BR'],
    {
      placeholder:
        'Escreva um comentário aqui (preencha com o endereço de email para receber notificações quando tiver alguma resposta)',
    },
  ],
  [
    ['pl', 'pl-PL'],
    {
      placeholder:
        'Wpisz tutaj komentarz (wpisz adres e-mail, aby otrzymać powiadomienie e-mail, gdy otrzymasz odpowiedź)',
    },
  ],
  [
    ['sk', 'sk-SK'],
    {
      placeholder:
        'Napíš svoj komentár (vlož svoj e-mail taktiež, aby si bol notifikovaný o odpovediach)',
    },
  ],
  [
    ['fr', 'fr-FR'],
    {
      placeholder:
        'Écrivez votre commentaire ici (Inscrivez votre email afin de recevoir une notification en cas de réponse)',
    },
  ],
  [
    ['es', 'es-ES'],
    {
      placeholder:
        'Escriba un comentario aquí (Ingrese su correo electrónico para recibir una notificación en caso de respuesta)',
    },
  ],
  [
    ['ja', 'ja-JP'],
    {
      placeholder:
        '伝言をどうぞ (メールアドレスを入力すると、返信があった際にメールでお知らせします。)',
    },
  ],
  [
    ['tr', 'tr-TR'],
    {
      placeholder:
        'Buraya bir yorum yazın (Yanıtlandığında bir e-posta bildirimi almak için e-posta adresinizi girin)',
    },
  ],
  [
    ['ko', 'ko-KO'],
    {
      placeholder:
        '댓글을 남겨주세요 (답글이 달렸을 때 이메일로 알림을 받으려면 이메일 주소를 입력하세요)',
    },
  ],
  [
    ['fi', 'fi-FI'],
    {
      placeholder:
        'Kirjoita kommentti tähän (täytä sähköpostiosoite saadaksesi sähköposti-ilmoituksen vastauksesta)',
    },
  ],
  [
    ['hu', 'hu-HU'],
    {
      placeholder:
        'Írj kommentet itt! (Töltsd ki az email címet, hogy értesítést kapj, amikor válaszolnak.)',
    },
  ],
  [
    ['id', 'id-ID'],
    {
      placeholder:
        'Tulis komentar di sini (Isi alamat email untuk menerima notifikasi jika komentar kamu telah dibalas orang lain)',
    },
  ],
  [
    ['nl', 'nl-NL'],
    {
      placeholder:
        'Schrijf een opmerking hier (Vul je emailadres in om een email-notificatie te ontvangen wanneer er gereageerd wordt.',
    },
  ],
]
