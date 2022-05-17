function tabs() {
        // Tabs (кнопки таба + видемость текста и клик на свап)

        const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

  function hideTabsContent() {
      tabsContent.forEach(item => {
          item.style.display = 'none';
      });
      tabs.forEach(item => {
          item.classList.remove('tabheader__item_active');
      });
  };

  function showTabsContent(i = 0) {
      tabsContent[i].style.display = 'block';
      tabs[i].classList.add('tabheader__item_active')
  }

  hideTabsContent()
  showTabsContent()

  tabsParent.addEventListener('click', (event) => {
      const target = event.target
      if(target && target.classList.contains('tabheader__item')) {
          tabs.forEach((item, i) => {
              if(target == item) {
                  hideTabsContent()
                  showTabsContent(i)
              }
          })
      }
  });
}

export default tabs;