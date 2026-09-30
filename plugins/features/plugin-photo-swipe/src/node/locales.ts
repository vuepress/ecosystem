import type { DefaultLocaleInfo } from '@vuepress/helper'

import type { PhotoSwipePluginLocaleData } from '../shared/index.js'

/**
 * Default locale info for PhotoSwipe plugin
 *
 * PhotoSwipe 插件的默认多语言信息
 */
export const photoSwipeLocaleInfo: DefaultLocaleInfo<PhotoSwipePluginLocaleData> =
  [
    [
      ['en', 'en-US'],
      {
        close: 'Close',
        download: 'Download Image',
        fullscreen: 'Switch to fullscreen',
        zoom: 'Zoom in/out',
        arrowPrev: 'Prev (Arrow Left)',
        arrowNext: 'Next (Arrow Right)',
        errorMsg: 'The image cannot be loaded',
      },
    ],
    [
      ['zh', 'zh-CN', 'zh-Hans'],
      {
        close: '关闭',
        download: '下载图片',
        fullscreen: '切换全屏',
        zoom: '缩放',
        arrowPrev: '上一个 (左箭头)',
        arrowNext: '下一个 (右箭头)',
        errorMsg: '图片无法加载',
      },
    ],
    [
      ['zh-TW', 'zh-Hant'],
      {
        close: '關閉',
        download: '下載圖片',
        fullscreen: '切換全屏',
        zoom: '縮放',
        arrowPrev: '上一個 (左箭頭)',
        arrowNext: '下一個 (右箭頭)',
        errorMsg: '圖片無法載入',
      },
    ],
    [
      ['de', 'de-DE'],
      {
        close: 'Schließen',
        download: 'Bild herunterladen',
        fullscreen: 'Vollbild aktivieren',
        zoom: 'Rein / rauszoomen',
        arrowPrev: 'Zurück (Pfeil links)',
        arrowNext: 'Weiter (Pfeil rechts)',
        errorMsg: 'Das Bild kann nicht geladen werden',
      },
    ],
    [
      ['de-AT'],
      {
        close: 'Schließen',
        download: 'Bild herunterladen',
        fullscreen: 'Vollbild aktivieren',
        zoom: 'Rein / rauszoomen',
        arrowPrev: 'Zurück (Pfeil links)',
        arrowNext: 'Weiter (Pfeil rechts)',
        errorMsg: 'Das Bild kann nicht geladen werden',
      },
    ],
    [
      ['vi', 'vi-VN'],
      {
        close: 'Đóng',
        download: 'Tải hình ảnh',
        fullscreen: 'Bật chế độ toàn màn hình',
        zoom: 'Phóng to / thu nhỏ',
        arrowPrev: 'Trước (Mũi tên trái)',
        arrowNext: 'Tiếp theo (Mũi tên Phải)',
        errorMsg: 'Không thể tải hình ảnh',
      },
    ],
    [
      ['uk'],
      {
        close: 'Закрити',
        download: 'Завантажити зображення',
        fullscreen: 'Перейти на повний екран',
        zoom: 'Збільшити/Зменшити',
        arrowPrev: 'Попередня (Стрілка вліво)',
        arrowNext: 'Далі (стрілка вправо)',
        errorMsg: 'Не вдалося завантажити зображення',
      },
    ],
    [
      ['ru', 'ru-RU'],
      {
        close: 'Закрыть',
        download: 'Загрузить изображение',
        fullscreen: 'Переключиться на полный экран',
        zoom: 'Увеличить/Уменьшить',
        arrowPrev: 'Предыдущая (Стрелка влево)',
        arrowNext: 'Следующая (Стрелка вправо)',
        errorMsg: 'Не удалось загрузить изображение',
      },
    ],
    [
      ['pt', 'pt-PT'],
      {
        close: 'Fechar',
        download: 'Descarregar imagem',
        fullscreen: 'Alternar para ecrã inteiro',
        zoom: 'Aproximar/afastar',
        arrowPrev: 'Anterior (Seta esquerda)',
        arrowNext: 'Seguinte (Seta direita)',
        errorMsg: 'Não foi possível carregar a imagem',
      },
    ],
    [
      ['pt-BR'],
      {
        close: 'Fechar',
        download: 'Baixar imagem',
        fullscreen: 'Alternar para tela cheia',
        zoom: 'Aproximar mais/menos',
        arrowPrev: 'Anterior (Seta Esquerda)',
        arrowNext: 'Próximo (Seta Direita)',
        errorMsg: 'Não foi possível carregar a imagem',
      },
    ],
    [
      ['pl', 'pl-PL'],
      {
        close: 'Zamknij',
        download: 'Pobierz obraz',
        fullscreen: 'Przełącz na pełny ekran',
        zoom: 'Powiększ/pomniejsz',
        arrowPrev: 'Poprzedni (strzałka w lewo)',
        arrowNext: 'Następny (strzałka w prawo)',
        errorMsg: 'Nie można wczytać obrazu',
      },
    ],
    [
      ['sk', 'sk-SK'],
      {
        close: 'Zatvor',
        download: 'Stiahni obrázok',
        fullscreen: 'Prepni na celú obrazovku',
        zoom: 'Priblíž/Oddial',
        arrowPrev: 'Predošlí (šípka doľava)',
        arrowNext: 'Nasledujúci (šípka doprava)',
        errorMsg: 'Obrázok sa nepodarilo načítať',
      },
    ],
    [
      ['fr', 'fr-FR'],
      {
        close: 'Fermer',
        download: "Télécharger l'image",
        fullscreen: 'Basculer en plein écran',
        zoom: 'Zoom avant/arrière',
        arrowPrev: 'Précédent (Flèche gauche)',
        arrowNext: 'Suivant (Flèche droite)',
        errorMsg: "Impossible de charger l'image",
      },
    ],
    [
      ['es', 'es-ES'],
      {
        close: 'Cerrar',
        download: 'Descargar imagen',
        fullscreen: 'Cambiar a pantalla completa',
        zoom: 'Acercar/Alejar',
        arrowPrev: 'Anterior (Flecha izquierda)',
        arrowNext: 'Siguiente (Flecha derecha)',
        errorMsg: 'No se puede cargar la imagen',
      },
    ],
    [
      ['it', 'it-IT'],
      {
        close: 'Chiudi',
        download: 'Scarica immagine',
        fullscreen: 'Passa a schermo intero',
        zoom: 'Ingrandisci/riduci',
        arrowPrev: 'Precedente (Freccia sinistra)',
        arrowNext: 'Successivo (Freccia destra)',
        errorMsg: "Impossibile caricare l'immagine",
      },
    ],
    [
      ['ja', 'ja-JP'],
      {
        close: '閉じる',
        download: '画像ダウンロード',
        fullscreen: '全画面表示への切り替え',
        zoom: '拡大・縮小',
        arrowPrev: '前へ（左矢印）',
        arrowNext: '次へ（右矢印）',
        errorMsg: '画像を読み込めません',
      },
    ],
    [
      ['tr', 'tr-TR'],
      {
        close: 'Kapat',
        download: 'Resmi indir',
        fullscreen: 'Tam ekrana geç',
        zoom: 'Yakınlaştır/Uzaklaştır',
        arrowPrev: 'Önceki (Sol ok)',
        arrowNext: 'Sonraki (Sağ ok)',
        errorMsg: 'Görsel yüklenemiyor',
      },
    ],
    [
      ['ko', 'ko-KR'],
      {
        close: '닫기',
        download: '이미지 다운로드',
        fullscreen: '전체 화면 전환',
        zoom: '확대/축소',
        arrowPrev: '이전 (왼쪽 화살표)',
        arrowNext: '다음 (오른쪽 화살표)',
        errorMsg: '이미지를 불러올 수 없습니다',
      },
    ],
    [
      ['fi', 'fi-FI'],
      {
        close: 'Sulje',
        download: 'Lataa kuva',
        fullscreen: 'Vaihda kokoruututilaan',
        zoom: 'Lähennä/Työnnä',
        arrowPrev: 'Edellinen (Vasen nuoli)',
        arrowNext: 'Seuraava (Oikea nuoli)',
        errorMsg: 'Kuvaa ei voi ladata',
      },
    ],
    [
      ['hu', 'hu-HU'],
      {
        close: 'Bezárás',
        download: 'Kép letöltése',
        fullscreen: 'Váltás teljes képernyőre',
        zoom: 'Nagyítás/kicsinyítés',
        arrowPrev: 'Előző (Balra nyíl)',
        arrowNext: 'Következő (Jobbra nyíl)',
        errorMsg: 'A kép nem tölthető be',
      },
    ],
    [
      ['id', 'id-ID'],
      {
        close: 'Tutup',
        download: 'Unduh gambar',
        fullscreen: 'Beralih ke layar penuh',
        zoom: 'Perbesar/Perkecil',
        arrowPrev: 'Sebelumnya (Panah kiri)',
        arrowNext: 'Selanjutnya (Panah kanan)',
        errorMsg: 'Gambar tidak dapat dimuat',
      },
    ],
    [
      ['nl', 'nl-NL'],
      {
        close: 'Sluiten',
        download: 'Download afbeelding',
        fullscreen: 'Schakel naar volledig scherm',
        zoom: 'In-/uitzoomen',
        arrowPrev: 'Vorige (Pijl Links)',
        arrowNext: 'Volgende (Pijl Rechts)',
        errorMsg: 'De afbeelding kan niet worden geladen',
      },
    ],
  ]
