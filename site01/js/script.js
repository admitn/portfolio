const getCookie = (name) => {
   let matches = document.cookie.match(new RegExp(
   "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"))
   return matches ? decodeURIComponent(matches[1]) : undefined
}

const informFooter = (() => {
  let cookie_inform = getCookie("cookieinform")
  let cookie_notice = document.querySelector('#cookie-notice')
  if (cookie_inform != "no") {
    cookie_notice.style.display = "block"
    document.querySelector("#cookie-close").addEventListener("click", () => {
      cookie_notice.style.display = "none"
      let date = new Date
      date.setDate(date.getDate() + 1)
      document.cookie = "cookieinform=no; sameSite=Lax; path=/; expires=" + date.toUTCString()
    })
  }
})()

const textCopy = (() => {
  document.oncopy = () => {
    let body = document.getElementsByTagName('body')[0]
    let selection = window.getSelection()
    let div = document.createElement('div')
    div.style.position = 'absolute'
    div.style.left = '-99999px'
    body.appendChild(div)
    div.innerHTML = selection + ' Источник ' + window.location.href
    selection.selectAllChildren(div)
    window.setTimeout(() => body.removeChild(div), 0)
  }
})()

const imageCopy = (() => {
  document.oncontextmenu = (e) => {
    let errorMsg = "Изображения на сайте защищены авторским правом"
    let clickedEl = (e == null) ? e.srcElement.tagName : e.target.tagName;
    if (clickedEl == "IMG") {
      alert(errorMsg)
      return false
    }
  }
})()

// Маска телефона
VMasker(document.querySelectorAll(".phone-input")).maskPattern("9 (999) 999-9999");

// Функция отправки формы
const ajaxSend = async (formData) => {
  const fetchResp = await fetch('/', {
    method: 'POST',
    headers: {
      "X-Requested-With": "XMLHttpRequest"
    },
    body: formData
  })
  if (!fetchResp.ok) {
    throw new Error(`Ошибка, статус ошибки ${fetchResp.status}`)
  }
  return await fetchResp.text()
}

// Кнопка наверх
const upBtn = (() => {
  let goTop = document.querySelector('#button-up')
  const trackScroll = () => {
    let scrolled = window.pageYOffset
    let coords = document.documentElement.clientHeight
    if (scrolled > coords) {
      goTop.classList.add('button-up-show')
    }
    if (scrolled < coords) {
      goTop.classList.remove('button-up-show')
    }
  }
  const backToTop = () => {
    if (window.pageYOffset > 0) {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      })
    }
  }
  window.addEventListener('scroll', trackScroll)
  goTop.addEventListener('click', backToTop)
})()


//Слайдер
document.addEventListener('DOMContentLoaded', function () {
  // инициализация слайдера
  let slider = new SimpleAdaptiveSlider('.slider', {
    loop: false,
    autoplay: false,
    interval: 5000,
    swipe: true,
  });
});

const showText = (el) => el.style.height = el.scrollHeight + 'px'
// Вопрос-Ответ
const faqToggle = (() => {
  let faq_block = document.getElementById('faq-block')
  const hideFaq = () => {
    let question = faq_block.querySelectorAll('.faq-question')
    let answer = faq_block.querySelectorAll('.faq-answer')
    question.forEach((el) => el.classList.remove('faq-active'))
    answer.forEach((el) => el.style.height = '0')
  }
  if (faq_block) {
    faq_block.addEventListener('click', (e) => {
      let faq = e.target.parentNode;
      if (!faq.classList.contains('faq-question')) return
      if (faq.classList.contains('faq-active')) {
        hideFaq()
      } else {
        hideFaq()
        faq.classList.add('faq-active')
        showText(faq.nextElementSibling)
      }
    })
  }
})()

//модальные окна
const modal = (link) => {
  let modalblock = document.querySelector(`#${link}`);
  OpenModal(modalblock);
}
const toggleMenu = function(el) {
  el.classList.toggle('modal-block--open');
}
document.addEventListener('click', function(e) {
  let modalopen = document.querySelector('.modal-block--open');
  let btnClose = document.querySelector('.modal-btn_close');
  const target = e.target;
  const its_modalopen = target == modalopen;
  const its_btn = target == btnClose;
  if (its_modalopen || its_btn) {
    CloseModal(modalopen);
  }
});
const OpenModal = (el) => {
  el.style.display = "";
  toggleMenu(el);
}
const CloseModal = (el) => {
  el.style.display = "none";
  toggleMenu(el);
}
