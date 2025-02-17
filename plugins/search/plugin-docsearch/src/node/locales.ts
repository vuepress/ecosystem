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
            navigateText: '切换',
            closeText: '关闭',
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
            navigateText: '切換',
            closeText: '關閉',
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
            resetButtonTitle: 'Suchkriterien zurücksetzen',
            resetButtonAriaLabel: 'Suchkriterien zurücksetzen',
            cancelButtonText: 'Abbrechen',
            cancelButtonAriaLabel: 'Abbrechen',
            searchInputLabel: 'Suche',
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
            navigateText: 'Navigieren',
            closeText: 'Schließen',
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
            navigateText: 'Chuyển đến',
            closeText: 'Đóng',
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
            navigateText: 'Перейти',
            closeText: 'Закрити',
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
            navigateText: 'Перейти',
            closeText: 'Закрыть',
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
            navigateText: 'Navegar',
            closeText: 'Fechar',
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
            navigateText: 'Przejdź',
            closeText: 'Zamknij',
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
            navigateText: 'Prejsť',
            closeText: 'Zavrieť',
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
            navigateText: 'Naviguer',
            closeText: 'Fermer',
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
            navigateText: 'Navegar',
            closeText: 'Cerrar',
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
            navigateText: '移動',
            closeText: '閉じる',
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
            navigateText: 'Gezin',
            closeText: 'Kapat',
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
            navigateText: '이동',
            closeText: '닫기',
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
            navigateText: 'Siirry',
            closeText: 'Sulje',
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
            navigateText: 'Ugrás',
            closeText: 'Bezárás',
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
            navigateText: 'Navigasi',
            closeText: 'Tutup',
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
            navigateText: 'Navigeren',
            closeText: 'Sluiten',
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
