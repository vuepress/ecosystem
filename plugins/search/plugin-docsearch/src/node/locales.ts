/* oxlint-disable max-lines */
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
          // @ts-expect-error: enterKeyHint and enterKeyHintAskAi do not need to be provided per locale
          searchBox: {
            clearButtonTitle: '清除查询条件',
            clearButtonAriaLabel: '清除查询条件',
            closeButtonText: '关闭',
            closeButtonAriaLabel: '关闭',
            placeholderText: '搜索文档',
            placeholderTextAskAi: '向 AI 助手提问',
            placeholderTextAskAiStreaming: '回答中...',
            searchInputLabel: '搜索',
            backToKeywordSearchButtonText: '返回关键字搜索',
            backToKeywordSearchButtonAriaLabel: '返回关键字搜索',
            newConversationPlaceholder: '询问问题',
            conversationHistoryTitle: '对话历史',
            startNewConversationText: '新对话',
            viewConversationHistoryText: '对话历史',
          },
          startScreen: {
            recentSearchesTitle: '搜索历史',
            noRecentSearchesText: '没有搜索历史',
            saveRecentSearchButtonTitle: '保存至搜索历史',
            removeRecentSearchButtonTitle: '从搜索历史中移除',
            favoriteSearchesTitle: '收藏',
            removeFavoriteSearchButtonTitle: '从收藏中移除',
            recentConversationsTitle: '最近对话',
            removeRecentConversationButtonTitle: '从最近对话中移除',
          },
          errorScreen: {
            titleText: '无法获取结果',
            helpText: '你可能需要检查你的网络连接',
          },
          noResultsScreen: {
            noResultsText: '无法找到相关结果为',
            suggestedQueryText: '你可以尝试查询',
            reportMissingResultsText: '你认为该查询应该有结果？',
            reportMissingResultsLinkText: '告知我们',
          },
          resultsScreen: {
            askAiPlaceholder: '询问AI：',
            noResultsAskAiPlaceholder: '没有找到文档？让 AI 来帮忙：',
          },
          // @ts-expect-error: aggregatedTollCallNode and aggregatedTollCallText shall be remain default
          askAiScreen: {
            disclaimerText: 'AI 助手的回答可能不准确。自行验证回复。',
            relatedSourcesText: '相关资源',
            thinkingText: '思考中...',
            copyButtonText: '复制',
            copyButtonCopiedText: '已复制',
            copyButtonTitle: '复制',
            likeButtonTitle: '有帮助',
            dislikeButtonTitle: '没帮助',
            thanksForFeedbackText: '感谢您的反馈！',
            preToolCallText: '搜索中...',
            duringToolCallText: '搜索',
            afterToolCallText: '已搜索',
            stoppedStreamingText: '你停止了此回复',
          },
          footer: {
            selectText: '选择',
            submitQuestionText: '提交问题',
            selectKeyAriaLabel: '回车键',
            navigateText: '切换',
            navigateUpKeyAriaLabel: '上箭头',
            navigateDownKeyAriaLabel: '下箭头',
            closeText: '关闭',
            backToSearchText: '返回搜索',
            closeKeyAriaLabel: 'ESC 键',
            poweredByText: '搜索提供者',
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
          // @ts-expect-error: enterKeyHint and enterKeyHintAskAi do not need to be provided per locale
          searchBox: {
            searchInputLabel: '搜尋',
            clearButtonTitle: '清除查詢條件',
            clearButtonAriaLabel: '清除查詢條件',
            closeButtonText: '關閉',
            closeButtonAriaLabel: '關閉',
            placeholderText: '搜尋文件',
            placeholderTextAskAi: '向 AI 助手提問',
            placeholderTextAskAiStreaming: '回答中...',
            backToKeywordSearchButtonText: '返回關鍵字搜尋',
            backToKeywordSearchButtonAriaLabel: '返回關鍵字搜尋',
            newConversationPlaceholder: '詢問問題',
            conversationHistoryTitle: '對話歷史',
            startNewConversationText: '新對話',
            viewConversationHistoryText: '對話歷史',
          },
          startScreen: {
            recentSearchesTitle: '搜尋歷史',
            noRecentSearchesText: '沒有搜尋歷史',
            saveRecentSearchButtonTitle: '保存至搜尋歷史',
            removeRecentSearchButtonTitle: '從搜尋歷史中移除',
            favoriteSearchesTitle: '收藏',
            removeFavoriteSearchButtonTitle: '從收藏中移除',
            recentConversationsTitle: '最近對話',
            removeRecentConversationButtonTitle: '從最近對話中移除',
          },
          errorScreen: {
            titleText: '無法獲取結果',
            helpText: '你可能需要檢查你的網絡連接',
          },
          footer: {
            selectText: '選擇',
            submitQuestionText: '提交問題',
            selectKeyAriaLabel: '回車鍵',
            navigateText: '切換',
            navigateUpKeyAriaLabel: '上箭頭',
            navigateDownKeyAriaLabel: '下箭頭',
            closeText: '關閉',
            backToSearchText: '返回搜尋',
            closeKeyAriaLabel: 'ESC 鍵',
            poweredByText: '搜尋提供者',
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
          // @ts-expect-error: enterKeyHint and enterKeyHintAskAi do not need to be provided per locale
          searchBox: {
            searchInputLabel: 'Suche',
            clearButtonTitle: 'Suchkriterien zurücksetzen',
            clearButtonAriaLabel: 'Suchkriterien zurücksetzen',
            closeButtonText: 'Schließen',
            closeButtonAriaLabel: 'Schließen',
            placeholderText: 'Dokumentation durchsuchen',
            placeholderTextAskAi: 'Frage den KI-Assistenten',
            placeholderTextAskAiStreaming: 'Antwort wird generiert...',
            backToKeywordSearchButtonText: 'Zurück zur Stichwortsuche',
            backToKeywordSearchButtonAriaLabel: 'Zurück zur Stichwortsuche',
            newConversationPlaceholder: 'Frage stellen',
            conversationHistoryTitle: 'Unterhaltungsverlauf',
            startNewConversationText: 'Neue Unterhaltung',
            viewConversationHistoryText: 'Unterhaltungsverlauf',
          },
          startScreen: {
            recentSearchesTitle: 'Letzte Suchen',
            noRecentSearchesText: 'Keine letzten Suchen',
            saveRecentSearchButtonTitle: 'Zu den letzten Suchen hinzufügen',
            removeRecentSearchButtonTitle: 'Aus den letzten Suchen entfernen',
            favoriteSearchesTitle: 'Favoriten',
            removeFavoriteSearchButtonTitle: 'Aus den Favoriten entfernen',
            recentConversationsTitle: 'Letzte Unterhaltungen',
            removeRecentConversationButtonTitle:
              'Aus den letzten Unterhaltungen entfernen',
          },
          errorScreen: {
            titleText: 'Keine Ergebnisse gefunden',
            helpText: 'Überprüfen Sie Ihre Netzwerkverbindung',
          },
          footer: {
            selectText: 'Auswählen',
            submitQuestionText: 'Frage senden',
            selectKeyAriaLabel: 'Eingabetaste',
            navigateText: 'Navigieren',
            navigateUpKeyAriaLabel: 'Nach oben Pfeil',
            navigateDownKeyAriaLabel: 'Nach unten Pfeil',
            closeText: 'Schließen',
            backToSearchText: 'Zurück zur Suche',
            closeKeyAriaLabel: 'ESC-Taste',
            poweredByText: 'Suchanbieter',
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
          // @ts-expect-error: enterKeyHint and enterKeyHintAskAi do not need to be provided per locale
          searchBox: {
            searchInputLabel: 'Tìm kiếm',
            clearButtonTitle: 'Xóa điều kiện tìm kiếm',
            clearButtonAriaLabel: 'Xóa điều kiện tìm kiếm',
            closeButtonText: 'Đóng',
            closeButtonAriaLabel: 'Đóng',
            placeholderText: 'Tìm kiếm tài liệu',
            placeholderTextAskAi: 'Hỏi trợ lý AI',
            placeholderTextAskAiStreaming: 'Đang trả lời...',
            backToKeywordSearchButtonText: 'Quay lại tìm kiếm từ khóa',
            backToKeywordSearchButtonAriaLabel: 'Quay lại tìm kiếm từ khóa',
            newConversationPlaceholder: 'Đặt câu hỏi',
            conversationHistoryTitle: 'Lịch sử hội thoại',
            startNewConversationText: 'Cuộc hội thoại mới',
            viewConversationHistoryText: 'Lịch sử hội thoại',
          },
          startScreen: {
            recentSearchesTitle: 'Lịch sử tìm kiếm',
            noRecentSearchesText: 'Không có lịch sử tìm kiếm',
            saveRecentSearchButtonTitle: 'Lưu vào lịch sử tìm kiếm',
            removeRecentSearchButtonTitle: 'Xóa khỏi lịch sử tìm kiếm',
            favoriteSearchesTitle: 'Yêu thích',
            removeFavoriteSearchButtonTitle: 'Xóa khỏi yêu thích',
            recentConversationsTitle: 'Cuộc hội thoại gần đây',
            removeRecentConversationButtonTitle:
              'Xóa khỏi cuộc hội thoại gần đây',
          },
          errorScreen: {
            titleText: 'Không tìm thấy kết quả',
            helpText: 'Bạn có thể cần kiểm tra kết nối mạng của mình',
          },
          footer: {
            selectText: 'Chọn',
            submitQuestionText: 'Gửi câu hỏi',
            selectKeyAriaLabel: 'Phím Enter',
            navigateText: 'Chuyển đến',
            navigateUpKeyAriaLabel: 'Mũi tên lên',
            navigateDownKeyAriaLabel: 'Mũi tên xuống',
            closeText: 'Đóng',
            backToSearchText: 'Quay lại tìm kiếm',
            closeKeyAriaLabel: 'Phím ESC',
            poweredByText: 'Nhà cung cấp tìm kiếm',
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
          // @ts-expect-error: enterKeyHint and enterKeyHintAskAi do not need to be provided per locale
          searchBox: {
            searchInputLabel: 'Пошук',
            clearButtonTitle: 'Скинути умови пошуку',
            clearButtonAriaLabel: 'Скинути умови пошуку',
            closeButtonText: 'Закрити',
            closeButtonAriaLabel: 'Закрити',
            placeholderText: 'Пошук документації',
            placeholderTextAskAi: 'Поставити запитання AI-асистенту',
            placeholderTextAskAiStreaming: 'Формується відповідь...',
            backToKeywordSearchButtonText:
              'Повернутися до пошуку за ключовими словами',
            backToKeywordSearchButtonAriaLabel:
              'Повернутися до пошуку за ключовими словами',
            newConversationPlaceholder: 'Поставте запитання',
            conversationHistoryTitle: 'Історія розмов',
            startNewConversationText: 'Нова розмова',
            viewConversationHistoryText: 'Історія розмов',
          },
          startScreen: {
            recentSearchesTitle: 'Останні пошуки',
            noRecentSearchesText: 'Немає останніх пошуків',
            saveRecentSearchButtonTitle: 'Зберегти в останні пошуки',
            removeRecentSearchButtonTitle: 'Видалити з останніх пошуків',
            favoriteSearchesTitle: 'Обране',
            removeFavoriteSearchButtonTitle: 'Видалити з обраного',
            recentConversationsTitle: 'Нещодавні розмови',
            removeRecentConversationButtonTitle: 'Видалити з нещодавніх розмов',
          },
          errorScreen: {
            titleText: 'Немає результатів',
            helpText: 'Можливо, вам потрібно перевірити підключення до мережі',
          },
          footer: {
            selectText: 'Вибрати',
            submitQuestionText: 'Надіслати запитання',
            selectKeyAriaLabel: 'Клавіша Enter',
            navigateText: 'Перейти',
            navigateUpKeyAriaLabel: 'Стрілка вгору',
            navigateDownKeyAriaLabel: 'Стрілка вниз',
            closeText: 'Закрити',
            backToSearchText: 'Назад до пошуку',
            closeKeyAriaLabel: 'ESC',
            poweredByText: 'Постачальник пошуку',
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
          // @ts-expect-error: enterKeyHint and enterKeyHintAskAi do not need to be provided per locale
          searchBox: {
            searchInputLabel: 'Поиск',
            clearButtonTitle: 'Сбросить условия поиска',
            clearButtonAriaLabel: 'Сбросить условия поиска',
            closeButtonText: 'Закрыть',
            closeButtonAriaLabel: 'Закрыть',
            placeholderText: 'Поиск документации',
            placeholderTextAskAi: 'Задайте вопрос ИИ-ассистенту',
            placeholderTextAskAiStreaming: 'Формируется ответ...',
            backToKeywordSearchButtonText:
              'Вернуться к поиску по ключевым словам',
            backToKeywordSearchButtonAriaLabel:
              'Вернуться к поиску по ключевым словам',
            newConversationPlaceholder: 'Задайте вопрос',
            conversationHistoryTitle: 'История диалогов',
            startNewConversationText: 'Новый диалог',
            viewConversationHistoryText: 'История диалогов',
          },
          startScreen: {
            recentSearchesTitle: 'Последние запросы',
            noRecentSearchesText: 'Нет последних запросов',
            saveRecentSearchButtonTitle: 'Сохранить в последние запросы',
            removeRecentSearchButtonTitle: 'Удалить из последних запросов',
            favoriteSearchesTitle: 'Избранное',
            removeFavoriteSearchButtonTitle: 'Удалить из избранного',
            recentConversationsTitle: 'Недавние диалоги',
            removeRecentConversationButtonTitle: 'Удалить из недавних диалогов',
          },
          errorScreen: {
            titleText: 'Нет результатов',
            helpText: 'Возможно, вам стоит проверить подключение к сети',
          },
          footer: {
            selectText: 'Выбрать',
            submitQuestionText: 'Отправить вопрос',
            selectKeyAriaLabel: 'Клавиша Enter',
            navigateText: 'Перейти',
            navigateUpKeyAriaLabel: 'Стрелка вверх',
            navigateDownKeyAriaLabel: 'Стрелка вниз',
            closeText: 'Закрыть',
            backToSearchText: 'Назад к поиску',
            closeKeyAriaLabel: 'ESC',
            poweredByText: 'Поставщик поиска',
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
          // @ts-expect-error: enterKeyHint and enterKeyHintAskAi do not need to be provided per locale
          searchBox: {
            searchInputLabel: 'Pesquisar',
            clearButtonTitle: 'Limpar critérios de pesquisa',
            clearButtonAriaLabel: 'Limpar critérios de pesquisa',
            closeButtonText: 'Fechar',
            closeButtonAriaLabel: 'Fechar',
            placeholderText: 'Pesquisar documentação',
            placeholderTextAskAi: 'Pergunte ao assistente de IA',
            placeholderTextAskAiStreaming: 'Respondendo...',
            backToKeywordSearchButtonText:
              'Voltar à pesquisa por palavra-chave',
            backToKeywordSearchButtonAriaLabel:
              'Voltar à pesquisa por palavra-chave',
            newConversationPlaceholder: 'Faça uma pergunta',
            conversationHistoryTitle: 'Histórico de conversas',
            startNewConversationText: 'Nova conversa',
            viewConversationHistoryText: 'Histórico de conversas',
          },
          startScreen: {
            recentSearchesTitle: 'Pesquisas recentes',
            noRecentSearchesText: 'Nenhuma pesquisa recente',
            saveRecentSearchButtonTitle: 'Salvar nas pesquisas recentes',
            removeRecentSearchButtonTitle: 'Remover das pesquisas recentes',
            favoriteSearchesTitle: 'Favoritos',
            removeFavoriteSearchButtonTitle: 'Remover dos favoritos',
            recentConversationsTitle: 'Conversas recentes',
            removeRecentConversationButtonTitle:
              'Remover das conversas recentes',
          },
          errorScreen: {
            titleText: 'Nenhum resultado encontrado',
            helpText: 'Você pode precisar verificar sua conexão de rede',
          },
          footer: {
            selectText: 'Selecionar',
            submitQuestionText: 'Enviar pergunta',
            selectKeyAriaLabel: 'Tecla Enter',
            navigateText: 'Navegar',
            navigateUpKeyAriaLabel: 'Seta para cima',
            navigateDownKeyAriaLabel: 'Seta para baixo',
            closeText: 'Fechar',
            backToSearchText: 'Voltar para a pesquisa',
            closeKeyAriaLabel: 'Tecla ESC',
            poweredByText: 'Provedor de pesquisa',
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
          // @ts-expect-error: enterKeyHint and enterKeyHintAskAi do not need to be provided per locale
          searchBox: {
            searchInputLabel: 'Szukaj',
            clearButtonTitle: 'Wyczyść kryteria wyszukiwania',
            clearButtonAriaLabel: 'Wyczyść kryteria wyszukiwania',
            closeButtonText: 'Zamknij',
            closeButtonAriaLabel: 'Zamknij',
            placeholderText: 'Szukaj dokumentacji',
            placeholderTextAskAi: 'Zadaj pytanie asystentowi AI',
            placeholderTextAskAiStreaming: 'Odpowiedź w toku...',
            backToKeywordSearchButtonText:
              'Wróć do wyszukiwania słów kluczowych',
            backToKeywordSearchButtonAriaLabel:
              'Wróć do wyszukiwania słów kluczowych',
            newConversationPlaceholder: 'Zadaj pytanie',
            conversationHistoryTitle: 'Historia rozmów',
            startNewConversationText: 'Nowa rozmowa',
            viewConversationHistoryText: 'Historia rozmów',
          },
          startScreen: {
            recentSearchesTitle: 'Ostatnie wyszukiwania',
            noRecentSearchesText: 'Brak ostatnich wyszukiwań',
            saveRecentSearchButtonTitle: 'Zapisz w ostatnich wyszukiwaniach',
            removeRecentSearchButtonTitle: 'Usuń z ostatnich wyszukiwań',
            favoriteSearchesTitle: 'Ulubione',
            removeFavoriteSearchButtonTitle: 'Usuń z ulubionych',
            recentConversationsTitle: 'Ostatnie rozmowy',
            removeRecentConversationButtonTitle: 'Usuń z ostatnich rozmów',
          },
          errorScreen: {
            titleText: 'Brak wyników',
            helpText: 'Może warto sprawdzić połączenie sieciowe',
          },
          footer: {
            selectText: 'Wybierz',
            submitQuestionText: 'Wyślij pytanie',
            selectKeyAriaLabel: 'Klawisz Enter',
            navigateText: 'Przejdź',
            navigateUpKeyAriaLabel: 'Strzałka w górę',
            navigateDownKeyAriaLabel: 'Strzałka w dół',
            closeText: 'Zamknij',
            backToSearchText: 'Wróć do wyszukiwania',
            closeKeyAriaLabel: 'Klucz ESC',
            poweredByText: 'Dostawca wyszukiwania',
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
          // @ts-expect-error: enterKeyHint and enterKeyHintAskAi do not need to be provided per locale
          searchBox: {
            searchInputLabel: 'Hľadať',
            clearButtonTitle: 'Vymazať kritériá vyhľadávania',
            clearButtonAriaLabel: 'Vymazať kritériá vyhľadávania',
            closeButtonText: 'Zavrieť',
            closeButtonAriaLabel: 'Zavrieť',
            placeholderText: 'Hľadať dokumentáciu',
            placeholderTextAskAi: 'Spýtať sa asistenta AI',
            placeholderTextAskAiStreaming: 'Odpoveď sa generuje...',
            backToKeywordSearchButtonText:
              'Späť na vyhľadávanie kľúčových slov',
            backToKeywordSearchButtonAriaLabel:
              'Späť na vyhľadávanie kľúčových slov',
            newConversationPlaceholder: 'Položte otázku',
            conversationHistoryTitle: 'História konverzácií',
            startNewConversationText: 'Nová konverzácia',
            viewConversationHistoryText: 'História konverzácií',
          },
          startScreen: {
            recentSearchesTitle: 'Nedávne vyhľadávania',
            noRecentSearchesText: 'Žiadne nedávne vyhľadávania',
            saveRecentSearchButtonTitle: 'Uložiť do nedávnych vyhľadávaní',
            removeRecentSearchButtonTitle: 'Odstrániť z nedávnych vyhľadávaní',
            favoriteSearchesTitle: 'Obľúbené',
            removeFavoriteSearchButtonTitle: 'Odstrániť z obľúbených',
            recentConversationsTitle: 'Nedávne konverzácie',
            removeRecentConversationButtonTitle:
              'Odstrániť z nedávnych konverzácií',
          },
          errorScreen: {
            titleText: 'Žiadne výsledky',
            helpText: 'Možno by ste mali skontrolovať pripojenie k sieti',
          },
          footer: {
            selectText: 'Vybrať',
            submitQuestionText: 'Odoslať otázku',
            selectKeyAriaLabel: 'Kláves Enter',
            navigateText: 'Prejsť',
            navigateUpKeyAriaLabel: 'Šípka nahor',
            navigateDownKeyAriaLabel: 'Šípka nadol',
            closeText: 'Zavrieť',
            backToSearchText: 'Späť na vyhľadávanie',
            closeKeyAriaLabel: 'Kláves ESC',
            poweredByText: 'Poskytovateľ vyhľadávania',
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
          // @ts-expect-error: enterKeyHint and enterKeyHintAskAi do not need to be provided per locale
          searchBox: {
            searchInputLabel: 'Rechercher',
            clearButtonTitle: 'Réinitialiser les critères de recherche',
            clearButtonAriaLabel: 'Réinitialiser les critères de recherche',
            closeButtonText: 'Fermer',
            closeButtonAriaLabel: 'Fermer',
            placeholderText: 'Rechercher dans la documentation',
            placeholderTextAskAi: 'Poser une question à l’assistant IA',
            placeholderTextAskAiStreaming: 'Réponse en cours...',
            backToKeywordSearchButtonText:
              'Retour à la recherche par mots-clés',
            backToKeywordSearchButtonAriaLabel:
              'Retour à la recherche par mots-clés',
            newConversationPlaceholder: 'Poser une question',
            conversationHistoryTitle: 'Historique des conversations',
            startNewConversationText: 'Nouvelle conversation',
            viewConversationHistoryText: 'Historique des conversations',
          },
          startScreen: {
            recentSearchesTitle: 'Recherches récentes',
            noRecentSearchesText: 'Aucune recherche récente',
            saveRecentSearchButtonTitle:
              'Enregistrer dans les recherches récentes',
            removeRecentSearchButtonTitle: 'Supprimer des recherches récentes',
            favoriteSearchesTitle: 'Favoris',
            removeFavoriteSearchButtonTitle: 'Supprimer des favoris',
            recentConversationsTitle: 'Conversations récentes',
            removeRecentConversationButtonTitle:
              'Supprimer des conversations récentes',
          },
          errorScreen: {
            titleText: 'Aucun résultat',
            helpText: 'Vous devriez peut-être vérifier votre connexion réseau',
          },
          footer: {
            selectText: 'Sélectionner',
            submitQuestionText: 'Envoyer la question',
            selectKeyAriaLabel: 'Touche Entrée',
            navigateText: 'Naviguer',
            navigateUpKeyAriaLabel: 'Flèche vers le haut',
            navigateDownKeyAriaLabel: 'Flèche vers le bas',
            closeText: 'Fermer',
            backToSearchText: 'Retour à la recherche',
            closeKeyAriaLabel: 'Touche ÉCHAP',
            poweredByText: 'Fournisseur de recherche',
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
          // @ts-expect-error: enterKeyHint and enterKeyHintAskAi do not need to be provided per locale
          searchBox: {
            searchInputLabel: 'Buscar',
            clearButtonTitle: 'Restablecer criterios de búsqueda',
            clearButtonAriaLabel: 'Restablecer criterios de búsqueda',
            closeButtonText: 'Cerrar',
            closeButtonAriaLabel: 'Cerrar',
            placeholderText: 'Buscar documentación',
            placeholderTextAskAi: 'Preguntar al asistente de IA',
            placeholderTextAskAiStreaming: 'Respondiendo...',
            backToKeywordSearchButtonText:
              'Volver a la búsqueda por palabras clave',
            backToKeywordSearchButtonAriaLabel:
              'Volver a la búsqueda por palabras clave',
            newConversationPlaceholder: 'Haz una pregunta',
            conversationHistoryTitle: 'Historial de conversaciones',
            startNewConversationText: 'Nueva conversación',
            viewConversationHistoryText: 'Historial de conversaciones',
          },
          startScreen: {
            recentSearchesTitle: 'Búsquedas recientes',
            noRecentSearchesText: 'No hay búsquedas recientes',
            saveRecentSearchButtonTitle: 'Guardar en búsquedas recientes',
            removeRecentSearchButtonTitle: 'Eliminar de búsquedas recientes',
            favoriteSearchesTitle: 'Favoritos',
            removeFavoriteSearchButtonTitle: 'Eliminar de favoritos',
            recentConversationsTitle: 'Conversas recientes',
            removeRecentConversationButtonTitle:
              'Eliminar de conversaciones recientes',
          },
          errorScreen: {
            titleText: 'No se encontraron resultados',
            helpText: 'Quizás debas verificar tu conexión de red',
          },
          footer: {
            selectText: 'Seleccionar',
            submitQuestionText: 'Enviar pregunta',
            selectKeyAriaLabel: 'Tecla Enter',
            navigateText: 'Navegar',
            navigateUpKeyAriaLabel: 'Flecha hacia arriba',
            navigateDownKeyAriaLabel: 'Flecha hacia abajo',
            closeText: 'Cerrar',
            backToSearchText: 'Volver a la búsqueda',
            closeKeyAriaLabel: 'Tecla ESC',
            poweredByText: 'Proveedor de búsqueda',
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
          // @ts-expect-error: enterKeyHint and enterKeyHintAskAi do not need to be provided per locale
          searchBox: {
            searchInputLabel: '検索',
            clearButtonTitle: '検索条件をリセット',
            clearButtonAriaLabel: '検索条件をリセット',
            closeButtonText: '閉じる',
            closeButtonAriaLabel: '閉じる',
            placeholderText: 'ドキュメントを検索',
            placeholderTextAskAi: 'AI アシスタントに質問する',
            placeholderTextAskAiStreaming: '回答中...',
            backToKeywordSearchButtonText: 'キーワード検索に戻る',
            backToKeywordSearchButtonAriaLabel: 'キーワード検索に戻る',
            newConversationPlaceholder: '質問を入力',
            conversationHistoryTitle: '会話履歴',
            startNewConversationText: '新しい会話',
            viewConversationHistoryText: '会話履歴',
          },
          startScreen: {
            recentSearchesTitle: '最近の検索',
            noRecentSearchesText: '最近の検索はありません',
            saveRecentSearchButtonTitle: '最近の検索に保存',
            removeRecentSearchButtonTitle: '最近の検索から削除',
            favoriteSearchesTitle: 'お気に入り',
            removeFavoriteSearchButtonTitle: 'お気に入りから削除',
            recentConversationsTitle: '最近の会話',
            removeRecentConversationButtonTitle: '最近の会話から削除',
          },
          errorScreen: {
            titleText: '結果が見つかりません',
            helpText: 'ネットワーク接続を確認してください',
          },
          footer: {
            selectText: '選択',
            submitQuestionText: '質問を送信',
            selectKeyAriaLabel: 'Enter キー',
            navigateText: '移動',
            navigateUpKeyAriaLabel: '上矢印',
            navigateDownKeyAriaLabel: '下矢印',
            closeText: '閉じる',
            backToSearchText: '検索に戻る',
            closeKeyAriaLabel: 'ESCキー',
            poweredByText: '検索プロバイダ',
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
          // @ts-expect-error: enterKeyHint and enterKeyHintAskAi do not need to be provided per locale
          searchBox: {
            searchInputLabel: 'Ara',
            clearButtonTitle: 'Arama kriterlerini sıfırla',
            clearButtonAriaLabel: 'Arama kriterlerini sıfırla',
            closeButtonText: 'Kapat',
            closeButtonAriaLabel: 'Kapat',
            placeholderText: 'Belgeleri ara',
            placeholderTextAskAi: 'AI asistanına soru sor',
            placeholderTextAskAiStreaming: 'Yanıt oluşturuluyor...',
            backToKeywordSearchButtonText: 'Anahtar kelime aramasına geri dön',
            backToKeywordSearchButtonAriaLabel:
              'Anahtar kelime aramasına geri dön',
            newConversationPlaceholder: 'Soru sor',
            conversationHistoryTitle: 'Sohbet geçmişi',
            startNewConversationText: 'Yeni sohbet',
            viewConversationHistoryText: 'Sohbet geçmişi',
          },
          startScreen: {
            recentSearchesTitle: 'Son Aramalar',
            noRecentSearchesText: 'Son aramalar yok',
            saveRecentSearchButtonTitle: 'Son aramalara kaydet',
            removeRecentSearchButtonTitle: 'Son aramalardan kaldır',
            favoriteSearchesTitle: 'Favoriler',
            removeFavoriteSearchButtonTitle: 'Favorilerden kaldır',
            recentConversationsTitle: 'Son sohbetler',
            removeRecentConversationButtonTitle: 'Son sohbetlerden kaldır',
          },
          errorScreen: {
            titleText: 'Sonuç bulunamadı',
            helpText: 'Ağ bağlantınızı kontrol etmelisiniz',
          },
          footer: {
            selectText: 'Seç',
            submitQuestionText: 'Soruyu gönder',
            selectKeyAriaLabel: 'Enter tuşu',
            navigateText: 'Gezin',
            navigateUpKeyAriaLabel: 'Yukarı ok',
            navigateDownKeyAriaLabel: 'Aşağı ok',
            closeText: 'Kapat',
            backToSearchText: 'Aramaya geri dön',
            closeKeyAriaLabel: 'ESC tuşu',
            poweredByText: 'Arama sağlayıcısı',
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
          // @ts-expect-error: enterKeyHint and enterKeyHintAskAi do not need to be provided per locale
          searchBox: {
            searchInputLabel: '검색',
            clearButtonTitle: '검색 조건 초기화',
            clearButtonAriaLabel: '검색 조건 초기화',
            closeButtonText: '닫기',
            closeButtonAriaLabel: '닫기',
            placeholderText: '문서 검색',
            placeholderTextAskAi: 'AI 도우미에게 질문하기',
            placeholderTextAskAiStreaming: '답변 중...',
            backToKeywordSearchButtonText: '키워드 검색으로 돌아가기',
            backToKeywordSearchButtonAriaLabel: '키워드 검색으로 돌아가기',
            newConversationPlaceholder: '질문하기',
            conversationHistoryTitle: '대화 기록',
            startNewConversationText: '새 대화',
            viewConversationHistoryText: '대화 기록',
          },
          startScreen: {
            recentSearchesTitle: '최근 검색',
            noRecentSearchesText: '최근 검색 기록이 없습니다',
            saveRecentSearchButtonTitle: '최근 검색에 저장',
            removeRecentSearchButtonTitle: '최근 검색에서 제거',
            favoriteSearchesTitle: '즐겨찾기',
            removeFavoriteSearchButtonTitle: '즐겨찾기에서 제거',
            recentConversationsTitle: '최근 대화',
            removeRecentConversationButtonTitle: '최근 대화에서 제거',
          },
          errorScreen: {
            titleText: '결과를 찾을 수 없습니다',
            helpText: '네트워크 연결을 확인해보세요',
          },
          footer: {
            selectText: '선택',
            submitQuestionText: '질문 제출',
            selectKeyAriaLabel: 'Enter 키',
            navigateText: '이동',
            navigateUpKeyAriaLabel: '위쪽 화살표',
            navigateDownKeyAriaLabel: '아래쪽 화살표',
            closeText: '닫기',
            backToSearchText: '검색으로 돌아가기',
            closeKeyAriaLabel: 'ESC 키',
            poweredByText: '검색 제공업체',
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
          // @ts-expect-error: enterKeyHint and enterKeyHintAskAi do not need to be provided per locale
          searchBox: {
            searchInputLabel: 'Hae',
            clearButtonTitle: 'Nollaa hakuehdot',
            clearButtonAriaLabel: 'Nollaa hakuehdot',
            closeButtonText: 'Sulje',
            closeButtonAriaLabel: 'Sulje',
            placeholderText: 'Hae dokumentaatiosta',
            placeholderTextAskAi: 'Kysy AI-avustajalta',
            placeholderTextAskAiStreaming: 'Vastataan...',
            backToKeywordSearchButtonText: 'Takaisin avainsanahakuun',
            backToKeywordSearchButtonAriaLabel: 'Takaisin avainsanahakuun',
            newConversationPlaceholder: 'Esitä kysymys',
            conversationHistoryTitle: 'Keskusteluhistoria',
            startNewConversationText: 'Uusi keskustelu',
            viewConversationHistoryText: 'Keskusteluhistoria',
          },
          startScreen: {
            recentSearchesTitle: 'Viimeisimmät haut',
            noRecentSearchesText: 'Ei viimeisimpiä hakuja',
            saveRecentSearchButtonTitle: 'Tallenna viimeisimpiin hakuin',
            removeRecentSearchButtonTitle: 'Poista viimeisimmistä hauista',
            favoriteSearchesTitle: 'Suosikit',
            removeFavoriteSearchButtonTitle: 'Poista suosikeista',
            recentConversationsTitle: 'Viimeisimmät keskustelut',
            removeRecentConversationButtonTitle:
              'Poista viimeisimmistä keskusteluista',
          },
          errorScreen: {
            titleText: 'Ei tuloksia',
            helpText: 'Voisit tarkistaa verkkoyhteytesi',
          },
          footer: {
            selectText: 'Valitse',
            submitQuestionText: 'Lähetä kysymys',
            selectKeyAriaLabel: 'Enter-näppäin',
            navigateText: 'Siirry',
            navigateUpKeyAriaLabel: 'Ylös nuoli',
            navigateDownKeyAriaLabel: 'Alas nuoli',
            closeText: 'Sulje',
            backToSearchText: 'Takaisin hakuun',
            closeKeyAriaLabel: 'ESC-näppäin',
            poweredByText: 'Hakupalveluntarjoaja',
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
          // @ts-expect-error: enterKeyHint and enterKeyHintAskAi do not need to be provided per locale
          searchBox: {
            searchInputLabel: 'Keresés',
            clearButtonTitle: 'Keresési feltételek visszaállítása',
            clearButtonAriaLabel: 'Keresési feltételek visszaállítása',
            closeButtonText: 'Bezárás',
            closeButtonAriaLabel: 'Bezárás',
            placeholderText: 'Dokumentáció keresése',
            placeholderTextAskAi: 'Kérdezzen az AI asszisztenstől',
            placeholderTextAskAiStreaming: 'Válasz folyamatban...',
            backToKeywordSearchButtonText: 'Vissza a kulcsszavas kereséshez',
            backToKeywordSearchButtonAriaLabel:
              'Vissza a kulcsszavas kereséshez',
            newConversationPlaceholder: 'Tegyen fel kérdést',
            conversationHistoryTitle: 'Beszélgetések előzményei',
            startNewConversationText: 'Új beszélgetés',
            viewConversationHistoryText: 'Beszélgetések előzményei',
          },
          startScreen: {
            recentSearchesTitle: 'Legutóbbi keresések',
            noRecentSearchesText: 'Nincs legutóbbi keresés',
            saveRecentSearchButtonTitle: 'Mentés a legutóbbi keresések közé',
            removeRecentSearchButtonTitle:
              'Eltávolítás a legutóbbi keresésekből',
            favoriteSearchesTitle: 'Kedvencek',
            removeFavoriteSearchButtonTitle: 'Eltávolítás a kedvencekből',
            recentConversationsTitle: 'Legutóbbi beszélgetések',
            removeRecentConversationButtonTitle:
              'Eltávolítás a legutóbbi beszélgetésekből',
          },
          errorScreen: {
            titleText: 'Nincs találat',
            helpText: 'Lehet, hogy ellenőriznie kell a hálózati kapcsolatát',
          },
          footer: {
            selectText: 'Kiválasztás',
            submitQuestionText: 'Kérdés elküldése',
            selectKeyAriaLabel: 'Enter billentyű',
            navigateText: 'Ugrás',
            navigateUpKeyAriaLabel: 'Felfelé mutató nyíl',
            navigateDownKeyAriaLabel: 'Lefelé mutató nyíl',
            closeText: 'Bezárás',
            backToSearchText: 'Vissza a kereséshez',
            closeKeyAriaLabel: 'ESC gomb',
            poweredByText: 'Keresési szolgáltató',
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
          // @ts-expect-error: enterKeyHint and enterKeyHintAskAi do not need to be provided per locale
          searchBox: {
            searchInputLabel: 'Cari',
            clearButtonTitle: 'Atur ulang kriteria pencarian',
            clearButtonAriaLabel: 'Atur ulang kriteria pencarian',
            closeButtonText: 'Tutup',
            closeButtonAriaLabel: 'Tutup',
            placeholderText: 'Cari dokumentasi',
            placeholderTextAskAi: 'Tanyakan ke asisten AI',
            placeholderTextAskAiStreaming: 'Sedang menjawab...',
            backToKeywordSearchButtonText: 'Kembali ke pencarian kata kunci',
            backToKeywordSearchButtonAriaLabel:
              'Kembali ke pencarian kata kunci',
            newConversationPlaceholder: 'Ajukan pertanyaan',
            conversationHistoryTitle: 'Riwayat percakapan',
            startNewConversationText: 'Percakapan baru',
            viewConversationHistoryText: 'Riwayat percakapan',
          },
          startScreen: {
            recentSearchesTitle: 'Pencarian terbaru',
            noRecentSearchesText: 'Tidak ada pencarian terbaru',
            saveRecentSearchButtonTitle: 'Simpan dalam pencarian terbaru',
            removeRecentSearchButtonTitle: 'Hapus dari pencarian terbaru',
            favoriteSearchesTitle: 'Favorit',
            removeFavoriteSearchButtonTitle: 'Hapus dari favorit',
            recentConversationsTitle: 'Percakapan terbaru',
            removeRecentConversationButtonTitle:
              'Hapus dari percakapan terbaru',
          },
          errorScreen: {
            titleText: 'Tidak ada hasil',
            helpText: 'Anda mungkin perlu memeriksa koneksi jaringan Anda',
          },
          footer: {
            selectText: 'Pilih',
            submitQuestionText: 'Kirim pertanyaan',
            selectKeyAriaLabel: 'Tombol Enter',
            navigateText: 'Navigasi',
            navigateUpKeyAriaLabel: 'Panah atas',
            navigateDownKeyAriaLabel: 'Panah bawah',
            closeText: 'Tutup',
            backToSearchText: 'Kembali ke pencarian',
            closeKeyAriaLabel: 'Tombol ESC',
            poweredByText: 'Penyedia pencarian',
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
          // @ts-expect-error: enterKeyHint and enterKeyHintAskAi do not need to be provided per locale
          searchBox: {
            searchInputLabel: 'Zoeken',
            clearButtonTitle: 'Zoekcriteria resetten',
            clearButtonAriaLabel: 'Zoekcriteria resetten',
            closeButtonText: 'Sluiten',
            closeButtonAriaLabel: 'Sluiten',
            placeholderText: 'Documentatie doorzoeken',
            placeholderTextAskAi: 'Stel een vraag aan de AI-assistent',
            placeholderTextAskAiStreaming: 'Antwoord wordt gegenereerd...',
            backToKeywordSearchButtonText: 'Terug naar zoeken op trefwoord',
            backToKeywordSearchButtonAriaLabel:
              'Terug naar zoeken op trefwoord',
            newConversationPlaceholder: 'Stel een vraag',
            conversationHistoryTitle: 'Gespreksgeschiedenis',
            startNewConversationText: 'Nieuw gesprek',
            viewConversationHistoryText: 'Gespreksgeschiedenis',
          },
          startScreen: {
            recentSearchesTitle: 'Recente zoekopdrachten',
            noRecentSearchesText: 'Geen recente zoekopdrachten',
            saveRecentSearchButtonTitle: 'Opslaan in recente zoekopdrachten',
            removeRecentSearchButtonTitle:
              'Verwijderen uit recente zoekopdrachten',
            favoriteSearchesTitle: 'Favorieten',
            removeFavoriteSearchButtonTitle: 'Verwijderen uit favorieten',
            recentConversationsTitle: 'Conversas recentes',
            removeRecentConversationButtonTitle:
              'Verwijderen uit conversas recentes',
          },
          errorScreen: {
            titleText: 'Geen resultaten gevonden',
            helpText: 'Controleer uw netwerkverbinding',
          },
          footer: {
            selectText: 'Selecteren',
            submitQuestionText: 'Vraag verzenden',
            selectKeyAriaLabel: 'Enter-toets',
            navigateText: 'Navigeren',
            navigateUpKeyAriaLabel: 'Omhoog pijltje',
            navigateDownKeyAriaLabel: 'Omlaag pijltje',
            closeText: 'Sluiten',
            backToSearchText: 'Terug naar zoeken',
            closeKeyAriaLabel: 'ESC-toets',
            poweredByText: 'Zoekprovider',
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
