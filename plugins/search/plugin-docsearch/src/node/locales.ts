import type { DefaultLocaleInfo } from '@vuepress/helper'
import type { DocSearchLocaleData } from '../shared/index.js'

export const docSearchLocaleInfo: DefaultLocaleInfo<DocSearchLocaleData> = [
  // @ts-expect-error: en locale is built-in supported
  [['en', 'en-US'], {}],
  [
    ['zh', 'zh-CN', 'zh-Hans'],
    {
      placeholder: '搜索文档',
      translations: {
        button: {
          buttonText: '搜索文档',
          buttonAriaLabel: '搜索文档',
        },
        modal: {
          searchBox: {
            searchInputLabel: '搜索',
            resetButtonTitle: '清除查询条件',
            resetButtonAriaLabel: '清除查询条件',
            cancelButtonText: '取消',
            cancelButtonAriaLabel: '取消',
          },
          startScreen: {
            recentSearchesTitle: '搜索历史',
            noRecentSearchesText: '没有搜索历史',
            saveRecentSearchButtonTitle: '保存至搜索历史',
            removeRecentSearchButtonTitle: '从搜索历史中移除',
            favoriteSearchesTitle: '收藏',
            removeFavoriteSearchButtonTitle: '从收藏中移除',
          },
          errorScreen: {
            titleText: '无法获取结果',
            helpText: '你可能需要检查你的网络连接',
          },
          footer: {
            selectText: '选择',
            selectKeyAriaLabel: '选择一个结果',
            navigateText: '切换',
            navigateUpKeyAriaLabel: '上箭头',
            navigateDownKeyAriaLabel: '下箭头',
            closeText: '关闭',
            closeKeyAriaLabel: 'ESC 键',
            searchByText: '搜索提供者',
          },
          noResultsScreen: {
            noResultsText: '无法找到相关结果',
            suggestedQueryText: '你可以尝试查询',
            reportMissingResultsText: '你认为该查询应该有结果？',
            reportMissingResultsLinkText: '点击反馈',
          },
        },
      },
    },
  ],
  [
    ['zh-TW', 'zh-Hant'],
    {
      placeholder: '搜尋文件',
      translations: {
        button: {
          buttonText: '搜尋文件',
          buttonAriaLabel: '搜尋文件',
        },
        modal: {
          searchBox: {
            searchInputLabel: '搜尋',
            resetButtonTitle: '清除查詢條件',
            resetButtonAriaLabel: '清除查詢條件',
            cancelButtonText: '取消',
            cancelButtonAriaLabel: '取消',
          },
          startScreen: {
            recentSearchesTitle: '搜尋歷史',
            noRecentSearchesText: '沒有搜尋歷史',
            saveRecentSearchButtonTitle: '保存至搜尋歷史',
            removeRecentSearchButtonTitle: '從搜尋歷史中移除',
            favoriteSearchesTitle: '收藏',
            removeFavoriteSearchButtonTitle: '從收藏中移除',
          },
          errorScreen: {
            titleText: '無法獲取結果',
            helpText: '你可能需要檢查你的網絡連接',
          },
          footer: {
            selectText: '選擇',
            selectKeyAriaLabel: '選擇一個結果',
            navigateText: '切換',
            navigateUpKeyAriaLabel: '上箭頭',
            navigateDownKeyAriaLabel: '下箭頭',
            closeText: '關閉',
            closeKeyAriaLabel: 'ESC 鍵',
            searchByText: '搜尋提供者',
          },
          noResultsScreen: {
            noResultsText: '無法找到相關結果',
            suggestedQueryText: '你可以嘗試查詢',
            reportMissingResultsText: '你認為該查詢應該有結果？',
            reportMissingResultsLinkText: '點擊反饋',
          },
        },
      },
    },
  ],
  [
    ['de', 'de-DE'],
    {
      placeholder: 'Durchsuchen der Dokumentation',
      translations: {
        button: {
          buttonText: 'Durchsuchen',
          buttonAriaLabel: 'Durchsuchen',
        },
        modal: {
          searchBox: {
            searchInputLabel: 'Suche',
            resetButtonTitle: 'Suchkriterien zurücksetzen',
            resetButtonAriaLabel: 'Suchkriterien zurücksetzen',
            cancelButtonText: 'Abbrechen',
            cancelButtonAriaLabel: 'Abbrechen',
          },
          startScreen: {
            recentSearchesTitle: 'Letzte Suchen',
            noRecentSearchesText: 'Keine letzten Suchen',
            saveRecentSearchButtonTitle: 'Zu den letzten Suchen hinzufügen',
            removeRecentSearchButtonTitle: 'Aus den letzten Suchen entfernen',
            favoriteSearchesTitle: 'Favoriten',
            removeFavoriteSearchButtonTitle: 'Aus den Favoriten entfernen',
          },
          errorScreen: {
            titleText: 'Keine Ergebnisse gefunden',
            helpText: 'Überprüfen Sie Ihre Netzwerkverbindung',
          },
          footer: {
            selectText: 'Auswählen',
            selectKeyAriaLabel: 'Ein Ergebnis auswählen',
            navigateText: 'Navigieren',
            navigateUpKeyAriaLabel: 'Nach oben Pfeil',
            navigateDownKeyAriaLabel: 'Nach unten Pfeil',
            closeText: 'Schließen',
            closeKeyAriaLabel: 'ESC-Taste',
            searchByText: 'Suchanbieter',
          },
          noResultsScreen: {
            noResultsText: 'Keine relevanten Ergebnisse gefunden',
            suggestedQueryText:
              'Versuchen Sie es mit einer anderen Suchanfrage',
            reportMissingResultsText: 'Sie denken, es sollte Ergebnisse geben?',
            reportMissingResultsLinkText: 'Feedback geben',
          },
        },
      },
    },
  ],
  [
    ['vi', 'vi-VN'],
    {
      placeholder: 'Tìm kiếm tài liệu',
      translations: {
        button: {
          buttonText: 'Tìm kiếm',
          buttonAriaLabel: 'Tìm kiếm',
        },
        modal: {
          searchBox: {
            searchInputLabel: 'Tìm kiếm',
            resetButtonTitle: 'Xóa điều kiện tìm kiếm',
            resetButtonAriaLabel: 'Xóa điều kiện tìm kiếm',
            cancelButtonText: 'Hủy',
            cancelButtonAriaLabel: 'Hủy',
          },
          startScreen: {
            recentSearchesTitle: 'Lịch sử tìm kiếm',
            noRecentSearchesText: 'Không có lịch sử tìm kiếm',
            saveRecentSearchButtonTitle: 'Lưu vào lịch sử tìm kiếm',
            removeRecentSearchButtonTitle: 'Xóa khỏi lịch sử tìm kiếm',
            favoriteSearchesTitle: 'Yêu thích',
            removeFavoriteSearchButtonTitle: 'Xóa khỏi yêu thích',
          },
          errorScreen: {
            titleText: 'Không tìm thấy kết quả',
            helpText: 'Bạn có thể cần kiểm tra kết nối mạng của mình',
          },
          footer: {
            selectText: 'Chọn',
            selectKeyAriaLabel: 'Chọn một kết quả',
            navigateText: 'Chuyển đến',
            navigateUpKeyAriaLabel: 'Mũi tên lên',
            navigateDownKeyAriaLabel: 'Mũi tên xuống',
            closeText: 'Đóng',
            closeKeyAriaLabel: 'Phím ESC',
            searchByText: 'Nhà cung cấp tìm kiếm',
          },
          noResultsScreen: {
            noResultsText: 'Không tìm thấy kết quả liên quan',
            suggestedQueryText: 'Bạn có thể thử tìm kiếm khác',
            reportMissingResultsText: 'Bạn nghĩ rằng nên có kết quả?',
            reportMissingResultsLinkText: 'Gửi phản hồi',
          },
        },
      },
    },
  ],
  [
    ['uk'],
    {
      placeholder: 'Пошук документації',
      translations: {
        button: {
          buttonText: 'Пошук',
          buttonAriaLabel: 'Пошук',
        },
        modal: {
          searchBox: {
            searchInputLabel: 'Пошук',
            resetButtonTitle: 'Скинути умови пошуку',
            resetButtonAriaLabel: 'Скинути умови пошуку',
            cancelButtonText: 'Скасувати',
            cancelButtonAriaLabel: 'Скасувати',
          },
          startScreen: {
            recentSearchesTitle: 'Останні пошуки',
            noRecentSearchesText: 'Немає останніх пошуків',
            saveRecentSearchButtonTitle: 'Зберегти в останні пошуки',
            removeRecentSearchButtonTitle: 'Видалити з останніх пошуків',
            favoriteSearchesTitle: 'Обране',
            removeFavoriteSearchButtonTitle: 'Видалити з обраного',
          },
          errorScreen: {
            titleText: 'Немає результатів',
            helpText: 'Можливо, вам потрібно перевірити підключення до мережі',
          },
          footer: {
            selectText: 'Вибрати',
            selectKeyAriaLabel: 'Вибрати результат',
            navigateText: 'Перейти',
            navigateUpKeyAriaLabel: 'Стрілка вгору',
            navigateDownKeyAriaLabel: 'Стрілка вниз',
            closeText: 'Закрити',
            closeKeyAriaLabel: 'ESC',
            searchByText: 'Постачальник пошуку',
          },
          noResultsScreen: {
            noResultsText: 'Не знайдено відповідних результатів',
            suggestedQueryText: 'Спробуйте інший запит',
            reportMissingResultsText: 'Ви вважаєте, що має бути результат?',
            reportMissingResultsLinkText: 'Надіслати відгук',
          },
        },
      },
    },
  ],
  [
    ['ru', 'ru-RU'],
    {
      placeholder: 'Поиск документации',
      translations: {
        button: {
          buttonText: 'Поиск',
          buttonAriaLabel: 'Поиск',
        },
        modal: {
          searchBox: {
            searchInputLabel: 'Поиск',
            resetButtonTitle: 'Сбросить условия поиска',
            resetButtonAriaLabel: 'Сбросить условия поиска',
            cancelButtonText: 'Отмена',
            cancelButtonAriaLabel: 'Отмена',
          },
          startScreen: {
            recentSearchesTitle: 'Последние запросы',
            noRecentSearchesText: 'Нет последних запросов',
            saveRecentSearchButtonTitle: 'Сохранить в последние запросы',
            removeRecentSearchButtonTitle: 'Удалить из последних запросов',
            favoriteSearchesTitle: 'Избранное',
            removeFavoriteSearchButtonTitle: 'Удалить из избранного',
          },
          errorScreen: {
            titleText: 'Нет результатов',
            helpText: 'Возможно, вам стоит проверить подключение к сети',
          },
          footer: {
            selectText: 'Выбрать',
            selectKeyAriaLabel: 'Выбрать результат',
            navigateText: 'Перейти',
            navigateUpKeyAriaLabel: 'Стрелка вверх',
            navigateDownKeyAriaLabel: 'Стрелка вниз',
            closeText: 'Закрыть',
            closeKeyAriaLabel: 'ESC',
            searchByText: 'Поставщик поиска',
          },
          noResultsScreen: {
            noResultsText: 'Не найдено соответствующих результатов',
            suggestedQueryText: 'Попробуйте другой запрос',
            reportMissingResultsText: 'Вы считаете, что должен быть результат?',
            reportMissingResultsLinkText: 'Отправить отзыв',
          },
        },
      },
    },
  ],
  [
    ['br'],
    {
      placeholder: 'Pesquisar documentação',
      translations: {
        button: {
          buttonText: 'Pesquisar',
          buttonAriaLabel: 'Pesquisar',
        },
        modal: {
          searchBox: {
            searchInputLabel: 'Pesquisar',
            resetButtonTitle: 'Limpar critérios de pesquisa',
            resetButtonAriaLabel: 'Limpar critérios de pesquisa',
            cancelButtonText: 'Cancelar',
            cancelButtonAriaLabel: 'Cancelar',
          },
          startScreen: {
            recentSearchesTitle: 'Pesquisas recentes',
            noRecentSearchesText: 'Nenhuma pesquisa recente',
            saveRecentSearchButtonTitle: 'Salvar nas pesquisas recentes',
            removeRecentSearchButtonTitle: 'Remover das pesquisas recentes',
            favoriteSearchesTitle: 'Favoritos',
            removeFavoriteSearchButtonTitle: 'Remover dos favoritos',
          },
          errorScreen: {
            titleText: 'Nenhum resultado encontrado',
            helpText: 'Você pode precisar verificar sua conexão de rede',
          },
          footer: {
            selectText: 'Selecionar',
            selectKeyAriaLabel: 'Selecionar um resultado',
            navigateText: 'Navegar',
            navigateUpKeyAriaLabel: 'Seta para cima',
            navigateDownKeyAriaLabel: 'Seta para baixo',
            closeText: 'Fechar',
            closeKeyAriaLabel: 'Tecla ESC',
            searchByText: 'Provedor de pesquisa',
          },
          noResultsScreen: {
            noResultsText: 'Nenhum resultado relevante encontrado',
            suggestedQueryText: 'Você pode tentar pesquisar',
            reportMissingResultsText: 'Você acha que deveria haver resultados?',
            reportMissingResultsLinkText: 'Enviar feedback',
          },
        },
      },
    },
  ],
  [
    ['pl', 'pl-PL'],
    {
      placeholder: 'Szukaj dokumentacji',
      translations: {
        button: {
          buttonText: 'Szukaj',
          buttonAriaLabel: 'Szukaj',
        },
        modal: {
          searchBox: {
            searchInputLabel: 'Szukaj',
            resetButtonTitle: 'Wyczyść kryteria wyszukiwania',
            resetButtonAriaLabel: 'Wyczyść kryteria wyszukiwania',
            cancelButtonText: 'Anuluj',
            cancelButtonAriaLabel: 'Anuluj',
          },
          startScreen: {
            recentSearchesTitle: 'Ostatnie wyszukiwania',
            noRecentSearchesText: 'Brak ostatnich wyszukiwań',
            saveRecentSearchButtonTitle: 'Zapisz w ostatnich wyszukiwaniach',
            removeRecentSearchButtonTitle: 'Usuń z ostatnich wyszukiwań',
            favoriteSearchesTitle: 'Ulubione',
            removeFavoriteSearchButtonTitle: 'Usuń z ulubionych',
          },
          errorScreen: {
            titleText: 'Brak wyników',
            helpText: 'Może warto sprawdzić połączenie sieciowe',
          },
          footer: {
            selectText: 'Wybierz',
            selectKeyAriaLabel: 'Wybierz wynik',
            navigateText: 'Przejdź',
            navigateUpKeyAriaLabel: 'Strzałka w górę',
            navigateDownKeyAriaLabel: 'Strzałka w dół',
            closeText: 'Zamknij',
            closeKeyAriaLabel: 'Klucz ESC',
            searchByText: 'Dostawca wyszukiwania',
          },
          noResultsScreen: {
            noResultsText: 'Nie znaleziono odpowiednich wyników',
            suggestedQueryText: 'Możesz spróbować innego zapytania',
            reportMissingResultsText: 'Uważasz, że powinny być wyniki?',
            reportMissingResultsLinkText: 'Wyślij opinię',
          },
        },
      },
    },
  ],
  [
    ['sk', 'sk-SK'],
    {
      placeholder: 'Hľadať dokumentáciu',
      translations: {
        button: {
          buttonText: 'Hľadať',
          buttonAriaLabel: 'Hľadať',
        },
        modal: {
          searchBox: {
            searchInputLabel: 'Hľadať',
            resetButtonTitle: 'Vymazať kritériá vyhľadávania',
            resetButtonAriaLabel: 'Vymazať kritériá vyhľadávania',
            cancelButtonText: 'Zrušiť',
            cancelButtonAriaLabel: 'Zrušiť',
          },
          startScreen: {
            recentSearchesTitle: 'Nedávne vyhľadávania',
            noRecentSearchesText: 'Žiadne nedávne vyhľadávania',
            saveRecentSearchButtonTitle: 'Uložiť do nedávnych vyhľadávaní',
            removeRecentSearchButtonTitle: 'Odstrániť z nedávnych vyhľadávaní',
            favoriteSearchesTitle: 'Obľúbené',
            removeFavoriteSearchButtonTitle: 'Odstrániť z obľúbených',
          },
          errorScreen: {
            titleText: 'Žiadne výsledky',
            helpText: 'Možno by ste mali skontrolovať pripojenie k sieti',
          },
          footer: {
            selectText: 'Vybrať',
            selectKeyAriaLabel: 'Vybrať výsledok',
            navigateText: 'Prejsť',
            navigateUpKeyAriaLabel: 'Šípka nahor',
            navigateDownKeyAriaLabel: 'Šípka nadol',
            closeText: 'Zavrieť',
            closeKeyAriaLabel: 'Kláves ESC',
            searchByText: 'Poskytovateľ vyhľadávania',
          },
          noResultsScreen: {
            noResultsText: 'Nenašli sa žiadne relevantné výsledky',
            suggestedQueryText: 'Skúste iný dotaz',
            reportMissingResultsText: 'Myslíte si, že by mal byť výsledok?',
            reportMissingResultsLinkText: 'Odoslať spätnú väzbu',
          },
        },
      },
    },
  ],
  [
    ['fr', 'fr-FR'],
    {
      placeholder: 'Rechercher la documentation',
      translations: {
        button: {
          buttonText: 'Rechercher',
          buttonAriaLabel: 'Rechercher',
        },
        modal: {
          searchBox: {
            searchInputLabel: 'Rechercher',
            resetButtonTitle: 'Réinitialiser les critères de recherche',
            resetButtonAriaLabel: 'Réinitialiser les critères de recherche',
            cancelButtonText: 'Annuler',
            cancelButtonAriaLabel: 'Annuler',
          },
          startScreen: {
            recentSearchesTitle: 'Recherches récentes',
            noRecentSearchesText: 'Aucune recherche récente',
            saveRecentSearchButtonTitle:
              'Enregistrer dans les recherches récentes',
            removeRecentSearchButtonTitle: 'Supprimer des recherches récentes',
            favoriteSearchesTitle: 'Favoris',
            removeFavoriteSearchButtonTitle: 'Supprimer des favoris',
          },
          errorScreen: {
            titleText: 'Aucun résultat',
            helpText: 'Vous devriez peut-être vérifier votre connexion réseau',
          },
          footer: {
            selectText: 'Sélectionner',
            selectKeyAriaLabel: 'Sélectionner un résultat',
            navigateText: 'Naviguer',
            navigateUpKeyAriaLabel: 'Flèche vers le haut',
            navigateDownKeyAriaLabel: 'Flèche vers le bas',
            closeText: 'Fermer',
            closeKeyAriaLabel: 'Touche ÉCHAP',
            searchByText: 'Fournisseur de recherche',
          },
          noResultsScreen: {
            noResultsText: 'Aucun résultat pertinent trouvé',
            suggestedQueryText: 'Vous pouvez essayer une autre requête',
            reportMissingResultsText:
              "Vous pensez qu'il devrait y avoir des résultats ?",
            reportMissingResultsLinkText: 'Envoyer des commentaires',
          },
        },
      },
    },
  ],
  [
    ['es', 'es-ES'],
    {
      placeholder: 'Buscar documentación',
      translations: {
        button: {
          buttonText: 'Buscar',
          buttonAriaLabel: 'Buscar',
        },
        modal: {
          searchBox: {
            searchInputLabel: 'Buscar',
            resetButtonTitle: 'Restablecer criterios de búsqueda',
            resetButtonAriaLabel: 'Restablecer criterios de búsqueda',
            cancelButtonText: 'Cancelar',
            cancelButtonAriaLabel: 'Cancelar',
          },
          startScreen: {
            recentSearchesTitle: 'Búsquedas recientes',
            noRecentSearchesText: 'No hay búsquedas recientes',
            saveRecentSearchButtonTitle: 'Guardar en búsquedas recientes',
            removeRecentSearchButtonTitle: 'Eliminar de búsquedas recientes',
            favoriteSearchesTitle: 'Favoritos',
            removeFavoriteSearchButtonTitle: 'Eliminar de favoritos',
          },
          errorScreen: {
            titleText: 'No se encontraron resultados',
            helpText: 'Quizás debas verificar tu conexión de red',
          },
          footer: {
            selectText: 'Seleccionar',
            selectKeyAriaLabel: 'Seleccionar un resultado',
            navigateText: 'Navegar',
            navigateUpKeyAriaLabel: 'Flecha hacia arriba',
            navigateDownKeyAriaLabel: 'Flecha hacia abajo',
            closeText: 'Cerrar',
            closeKeyAriaLabel: 'Tecla ESC',
            searchByText: 'Proveedor de búsqueda',
          },
          noResultsScreen: {
            noResultsText: 'No se encontraron resultados relevantes',
            suggestedQueryText: 'Puedes intentar con otra consulta',
            reportMissingResultsText: '¿Crees que debería haber resultados?',
            reportMissingResultsLinkText: 'Enviar comentarios',
          },
        },
      },
    },
  ],
  [
    ['ja', 'ja-JP'],
    {
      placeholder: 'ドキュメントを検索',
      translations: {
        button: {
          buttonText: '検索',
          buttonAriaLabel: '検索',
        },
        modal: {
          searchBox: {
            searchInputLabel: '検索',
            resetButtonTitle: '検索条件をリセット',
            resetButtonAriaLabel: '検索条件をリセット',
            cancelButtonText: 'キャンセル',
            cancelButtonAriaLabel: 'キャンセル',
          },
          startScreen: {
            recentSearchesTitle: '最近の検索',
            noRecentSearchesText: '最近の検索はありません',
            saveRecentSearchButtonTitle: '最近の検索に保存',
            removeRecentSearchButtonTitle: '最近の検索から削除',
            favoriteSearchesTitle: 'お気に入り',
            removeFavoriteSearchButtonTitle: 'お気に入りから削除',
          },
          errorScreen: {
            titleText: '結果が見つかりません',
            helpText: 'ネットワーク接続を確認してください',
          },
          footer: {
            selectText: '選択',
            selectKeyAriaLabel: '結果を選択',
            navigateText: '移動',
            navigateUpKeyAriaLabel: '上矢印',
            navigateDownKeyAriaLabel: '下矢印',
            closeText: '閉じる',
            closeKeyAriaLabel: 'ESCキー',
            searchByText: '検索プロバイダ',
          },
          noResultsScreen: {
            noResultsText: '関連する結果が見つかりません',
            suggestedQueryText: '別のクエリを試してみてください',
            reportMissingResultsText: '結果があるはずですか？',
            reportMissingResultsLinkText: 'フィードバックを送信',
          },
        },
      },
    },
  ],
  [
    ['tr', 'tr-TR'],
    {
      placeholder: 'Belgeleri ara',
      translations: {
        button: {
          buttonText: 'Ara',
          buttonAriaLabel: 'Ara',
        },
        modal: {
          searchBox: {
            searchInputLabel: 'Ara',
            resetButtonTitle: 'Arama kriterlerini sıfırla',
            resetButtonAriaLabel: 'Arama kriterlerini sıfırla',
            cancelButtonText: 'İptal',
            cancelButtonAriaLabel: 'İptal',
          },
          startScreen: {
            recentSearchesTitle: 'Son Aramalar',
            noRecentSearchesText: 'Son aramalar yok',
            saveRecentSearchButtonTitle: 'Son aramalara kaydet',
            removeRecentSearchButtonTitle: 'Son aramalardan kaldır',
            favoriteSearchesTitle: 'Favoriler',
            removeFavoriteSearchButtonTitle: 'Favorilerden kaldır',
          },
          errorScreen: {
            titleText: 'Sonuç bulunamadı',
            helpText: 'Ağ bağlantınızı kontrol etmelisiniz',
          },
          footer: {
            selectText: 'Seç',
            selectKeyAriaLabel: 'Bir sonucu seç',
            navigateText: 'Gezin',
            navigateUpKeyAriaLabel: 'Yukarı ok',
            navigateDownKeyAriaLabel: 'Aşağı ok',
            closeText: 'Kapat',
            closeKeyAriaLabel: 'ESC tuşu',
            searchByText: 'Arama sağlayıcısı',
          },
          noResultsScreen: {
            noResultsText: 'İlgili sonuç bulunamadı',
            suggestedQueryText: 'Başka bir sorgu deneyin',
            reportMissingResultsText:
              'Sonuç olması gerektiğini düşünüyor musunuz?',
            reportMissingResultsLinkText: 'Geri bildirim gönder',
          },
        },
      },
    },
  ],
  [
    ['ko', 'ko-KO'],
    {
      placeholder: '문서 검색',
      translations: {
        button: {
          buttonText: '검색',
          buttonAriaLabel: '검색',
        },
        modal: {
          searchBox: {
            searchInputLabel: '검색',
            resetButtonTitle: '검색 조건 초기화',
            resetButtonAriaLabel: '검색 조건 초기화',
            cancelButtonText: '취소',
            cancelButtonAriaLabel: '취소',
          },
          startScreen: {
            recentSearchesTitle: '최근 검색',
            noRecentSearchesText: '최근 검색 기록이 없습니다',
            saveRecentSearchButtonTitle: '최근 검색에 저장',
            removeRecentSearchButtonTitle: '최근 검색에서 제거',
            favoriteSearchesTitle: '즐겨찾기',
            removeFavoriteSearchButtonTitle: '즐겨찾기에서 제거',
          },
          errorScreen: {
            titleText: '결과를 찾을 수 없습니다',
            helpText: '네트워크 연결을 확인해보세요',
          },
          footer: {
            selectText: '선택',
            selectKeyAriaLabel: '결과 선택',
            navigateText: '이동',
            navigateUpKeyAriaLabel: '위쪽 화살표',
            navigateDownKeyAriaLabel: '아래쪽 화살표',
            closeText: '닫기',
            closeKeyAriaLabel: 'ESC 키',
            searchByText: '검색 제공업체',
          },
          noResultsScreen: {
            noResultsText: '관련 결과를 찾을 수 없습니다',
            suggestedQueryText: '다른 검색어를 시도해보세요',
            reportMissingResultsText: '결과가 있어야 한다고 생각하시나요?',
            reportMissingResultsLinkText: '피드백 보내기',
          },
        },
      },
    },
  ],
  [
    ['fi', 'fi-FI'],
    {
      placeholder: 'Hae dokumentaatiosta',
      translations: {
        button: {
          buttonText: 'Hae',
          buttonAriaLabel: 'Hae',
        },
        modal: {
          searchBox: {
            searchInputLabel: 'Hae',
            resetButtonTitle: 'Nollaa hakuehdot',
            resetButtonAriaLabel: 'Nollaa hakuehdot',
            cancelButtonText: 'Peruuta',
            cancelButtonAriaLabel: 'Peruuta',
          },
          startScreen: {
            recentSearchesTitle: 'Viimeisimmät haut',
            noRecentSearchesText: 'Ei viimeisimpiä hakuja',
            saveRecentSearchButtonTitle: 'Tallenna viimeisimpiin hakuin',
            removeRecentSearchButtonTitle: 'Poista viimeisimmistä hauista',
            favoriteSearchesTitle: 'Suosikit',
            removeFavoriteSearchButtonTitle: 'Poista suosikeista',
          },
          errorScreen: {
            titleText: 'Ei tuloksia',
            helpText: 'Voisit tarkistaa verkkoyhteytesi',
          },
          footer: {
            selectText: 'Valitse',
            selectKeyAriaLabel: 'Valitse tulos',
            navigateText: 'Siirry',
            navigateUpKeyAriaLabel: 'Ylös nuoli',
            navigateDownKeyAriaLabel: 'Alas nuoli',
            closeText: 'Sulje',
            closeKeyAriaLabel: 'ESC-näppäin',
            searchByText: 'Hakupalveluntarjoaja',
          },
          noResultsScreen: {
            noResultsText: 'Ei löytynyt vastaavia tuloksia',
            suggestedQueryText: 'Kokeile toista hakua',
            reportMissingResultsText: 'Luulet, että tuloksia pitäisi olla?',
            reportMissingResultsLinkText: 'Lähetä palautetta',
          },
        },
      },
    },
  ],
  [
    ['hu', 'hu-HU'],
    {
      placeholder: 'Dokumentáció keresése',
      translations: {
        button: {
          buttonText: 'Keresés',
          buttonAriaLabel: 'Keresés',
        },
        modal: {
          searchBox: {
            searchInputLabel: 'Keresés',
            resetButtonTitle: 'Keresési feltételek visszaállítása',
            resetButtonAriaLabel: 'Keresési feltételek visszaállítása',
            cancelButtonText: 'Mégse',
            cancelButtonAriaLabel: 'Mégse',
          },
          startScreen: {
            recentSearchesTitle: 'Legutóbbi keresések',
            noRecentSearchesText: 'Nincs legutóbbi keresés',
            saveRecentSearchButtonTitle: 'Mentés a legutóbbi keresések közé',
            removeRecentSearchButtonTitle:
              'Eltávolítás a legutóbbi keresésekből',
            favoriteSearchesTitle: 'Kedvencek',
            removeFavoriteSearchButtonTitle: 'Eltávolítás a kedvencekből',
          },
          errorScreen: {
            titleText: 'Nincs találat',
            helpText: 'Lehet, hogy ellenőriznie kell a hálózati kapcsolatát',
          },
          footer: {
            selectText: 'Kiválasztás',
            selectKeyAriaLabel: 'Találat kiválasztása',
            navigateText: 'Ugrás',
            navigateUpKeyAriaLabel: 'Felfelé mutató nyíl',
            navigateDownKeyAriaLabel: 'Lefelé mutató nyíl',
            closeText: 'Bezárás',
            closeKeyAriaLabel: 'ESC gomb',
            searchByText: 'Keresési szolgáltató',
          },
          noResultsScreen: {
            noResultsText: 'Nem találhatóak releváns találatok',
            suggestedQueryText: 'Próbáljon más keresést',
            reportMissingResultsText:
              'Szerinted eredményeknek kellene lenniük?',
            reportMissingResultsLinkText: 'Visszajelzés küldése',
          },
        },
      },
    },
  ],
  [
    ['id', 'id-ID'],
    {
      placeholder: 'Cari dokumentasi',
      translations: {
        button: {
          buttonText: 'Cari',
          buttonAriaLabel: 'Cari',
        },
        modal: {
          searchBox: {
            searchInputLabel: 'Cari',
            resetButtonTitle: 'Atur ulang kriteria pencarian',
            resetButtonAriaLabel: 'Atur ulang kriteria pencarian',
            cancelButtonText: 'Batal',
            cancelButtonAriaLabel: 'Batal',
          },
          startScreen: {
            recentSearchesTitle: 'Pencarian terbaru',
            noRecentSearchesText: 'Tidak ada pencarian terbaru',
            saveRecentSearchButtonTitle: 'Simpan dalam pencarian terbaru',
            removeRecentSearchButtonTitle: 'Hapus dari pencarian terbaru',
            favoriteSearchesTitle: 'Favorit',
            removeFavoriteSearchButtonTitle: 'Hapus dari favorit',
          },
          errorScreen: {
            titleText: 'Tidak ada hasil',
            helpText: 'Anda mungkin perlu memeriksa koneksi jaringan Anda',
          },
          footer: {
            selectText: 'Pilih',
            selectKeyAriaLabel: 'Pilih hasil',
            navigateText: 'Navigasi',
            navigateUpKeyAriaLabel: 'Panah atas',
            navigateDownKeyAriaLabel: 'Panah bawah',
            closeText: 'Tutup',
            closeKeyAriaLabel: 'Tombol ESC',
            searchByText: 'Penyedia pencarian',
          },
          noResultsScreen: {
            noResultsText: 'Tidak dapat menemukan hasil yang relevan',
            suggestedQueryText: 'Anda dapat mencoba pencarian lain',
            reportMissingResultsText: 'Anda berpikir harus ada hasil?',
            reportMissingResultsLinkText: 'Kirim umpan balik',
          },
        },
      },
    },
  ],
  [
    ['nl', 'nl-NL'],
    {
      placeholder: 'Documentatie doorzoeken',
      translations: {
        button: {
          buttonText: 'Zoeken',
          buttonAriaLabel: 'Zoeken',
        },
        modal: {
          searchBox: {
            searchInputLabel: 'Zoeken',
            resetButtonTitle: 'Zoekcriteria resetten',
            resetButtonAriaLabel: 'Zoekcriteria resetten',
            cancelButtonText: 'Annuleren',
            cancelButtonAriaLabel: 'Annuleren',
          },
          startScreen: {
            recentSearchesTitle: 'Recente zoekopdrachten',
            noRecentSearchesText: 'Geen recente zoekopdrachten',
            saveRecentSearchButtonTitle: 'Opslaan in recente zoekopdrachten',
            removeRecentSearchButtonTitle:
              'Verwijderen uit recente zoekopdrachten',
            favoriteSearchesTitle: 'Favorieten',
            removeFavoriteSearchButtonTitle: 'Verwijderen uit favorieten',
          },
          errorScreen: {
            titleText: 'Geen resultaten gevonden',
            helpText: 'Controleer uw netwerkverbinding',
          },
          footer: {
            selectText: 'Selecteren',
            selectKeyAriaLabel: 'Selecteer een resultaat',
            navigateText: 'Navigeren',
            navigateUpKeyAriaLabel: 'Omhoog pijltje',
            navigateDownKeyAriaLabel: 'Omlaag pijltje',
            closeText: 'Sluiten',
            closeKeyAriaLabel: 'ESC-toets',
            searchByText: 'Zoekprovider',
          },
          noResultsScreen: {
            noResultsText: 'Geen relevante resultaten gevonden',
            suggestedQueryText: 'U kunt proberen te zoeken',
            reportMissingResultsText: 'Denkt u dat er resultaten moeten zijn?',
            reportMissingResultsLinkText: 'Feedback verzenden',
          },
        },
      },
    },
  ],
]
