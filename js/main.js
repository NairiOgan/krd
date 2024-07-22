// Калькулятор 
document.addEventListener("DOMContentLoaded", function () {
    const propertyPriceInput = document.getElementById("property-price");
    const downPaymentInput = document.getElementById("down-payment");
    const loanTermInput = document.getElementById("loan-term");
    const propertyPriceOutput = document.getElementById("property-price-output");
    const downPaymentOutput = document.getElementById("down-payment-output");
    const loanTermOutput = document.getElementById("loan-term-output");
    const monthlyPaymentSpan = document.getElementById("monthly-payment");
    const paymentReductionSpan = document.getElementById("payment-reduction");
    const totalSavingsSpan = document.getElementById("total-savings");

    function updateOutputs() {
        propertyPriceOutput.textContent = propertyPriceInput.value;
        downPaymentOutput.textContent = downPaymentInput.value;
        loanTermOutput.textContent = loanTermInput.value;
        calculateMortgage();
    }



    function calculateMortgage() {
        const propertyPrice = parseFloat(propertyPriceInput.value);
        const downPayment = parseFloat(downPaymentInput.value);
        const loanTerm = parseInt(loanTermInput.value);
        const annualInterestRate = 0.06; // 6% годовых
        const reducedInterestRate = 0.04; // 4% годовых

        const loanAmount = propertyPrice - downPayment;
        const monthlyInterestRate = annualInterestRate / 12;
        const reducedMonthlyInterestRate = reducedInterestRate / 12;

        const numPayments = loanTerm * 12;

        const monthlyPayment = (loanAmount * monthlyInterestRate) /
            (1 - Math.pow(1 + monthlyInterestRate, -numPayments));
        const reducedMonthlyPayment = (loanAmount * reducedMonthlyInterestRate) /
            (1 - Math.pow(1 + reducedMonthlyInterestRate, -numPayments));

        const paymentReduction = monthlyPayment - reducedMonthlyPayment;
        const totalSavings = paymentReduction * numPayments;

        monthlyPaymentSpan.textContent = monthlyPayment.toFixed(1) + " руб./мес.";
        paymentReductionSpan.textContent = paymentReduction.toFixed(1) + " руб./мес.";
        totalSavingsSpan.textContent = (totalSavings / 10).toLocaleString('ru-RU', { style: 'currency', currency: 'RUB', minimumFractionDigits: 2, maximumFractionDigits: 2 });

    }

    propertyPriceInput.addEventListener("input", updateOutputs);
    downPaymentInput.addEventListener("input", updateOutputs);
    loanTermInput.addEventListener("input", updateOutputs);
    updateOutputs();


    // Код для отслеживания прогресса за ползунком 
    const inputs = document.querySelectorAll('.progress');
    const outputs = document.querySelectorAll('.range-output');

    function updateStyling(input, output) {
        const value = parseInt(input.value).toLocaleString();
        output.textContent = value;
        const min = parseInt(input.min);
        const max = parseInt(input.max);
        const percent = ((input.value - min) / (max - min)) * 100;
        const progressStyle = `linear-gradient(to right, var(--primary) 0%, var(--primary) ${percent}%, white ${percent}%, white 100%)`;
        input.style.background = progressStyle;
    }

    inputs.forEach((input, index) => {
        const output = outputs[index];

        updateStyling(input, output);

        input.addEventListener('input', function () {
            updateStyling(input, output);
        });
    });
});




// Слайдеры
const aboutSlider = new Swiper('.about-slider', {
    loop: true,

    // Пагинация 
    pagination: {
        el: '.about-pagination',
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    },

    // Количетсво выводимых слайдов
    slidesPerView: 1,

    // Отсутпы между слайдами
    spaceBetween: 10,

    // Скорость переключения слайдов
    speed: 500,

    // Авто высота 
    autoHeight: true,

    // адаптив
    // breakpoints: {
    //   320: {
    //     spaceBetween: 80,
    //     slidesPerView: 1,
    //   },
    //   958: {
    //     spaceBetween: 80,
    //     slidesPerView: 1.5,
    //   },
    //   1180: {
    //     spaceBetween: 140,
    //     slidesPerView: 2.5,
    //   },
    //   1290: {
    //     spaceBetween: 140,
    //     slidesPerView: 2.3,
    //   },
    //   1646: {
    //     spaceBetween: 150,
    //     slidesPerView: 3,
    //   },
    // },
});

const projectsNearbySlider = new Swiper('.projects-nearby-slider', {
    loop: true,

    // Количетсво выводимых слайдов
    slidesPerView: 3,

    // Отсутпы между слайдами
    spaceBetween: 20,

    // Скорость переключения слайдов
    speed: 500,

    // Авто высота 
    autoHeight: true,

    // адаптив
    breakpoints: {
        320: {
            slidesPerView: 1,
        },
        683: {
            slidesPerView: 2,
        },
        993: {
            slidesPerView: 3,
        },
        

    },
});

const banksSlider = new Swiper('.banks-slider', {
    loop: true,

    // Количетсво выводимых слайдов
    slidesPerView: 6,

    // Отсутпы между слайдами
    spaceBetween: 30,

    // Скорость переключения слайдов
    speed: 12000,

    autoplay: {
        delay: 0,
        disableOnInteraction: false,
        pauseOnMouseEnter: true
    },

    // адаптив
    // breakpoints: {
    //   320: {
    //     spaceBetween: 80,
    //     slidesPerView: 1,
    //   },
    //   958: {
    //     spaceBetween: 80,
    //     slidesPerView: 1.5,
    //   },
    //   1180: {
    //     spaceBetween: 140,
    //     slidesPerView: 2.5,
    //   },
    //   1290: {
    //     spaceBetween: 140,
    //     slidesPerView: 2.3,
    //   },
    //   1646: {
    //     spaceBetween: 150,
    //     slidesPerView: 3,
    //   },
    // },
});





// Табы 
document.addEventListener('DOMContentLoaded', function () {
    var tabContainers = document.querySelectorAll('.tabs');

    tabContainers.forEach(function (tabsContainer) {
        var buttons = tabsContainer.querySelectorAll('.tab-buttons button');
        var contents = tabsContainer.querySelectorAll('.tab-content');

        buttons.forEach(function (button) {
            button.addEventListener('click', function () {
                var tabId = this.getAttribute('data-tab');

                buttons.forEach(function (btn) {
                    btn.classList.remove('active');
                });
                contents.forEach(function (content) {
                    content.classList.remove('active');
                });

                this.classList.add('active');
                tabsContainer.querySelector('.tab-content[data-tab="' + tabId + '"]').classList.add('active');
            });
        });

        // Установить первый таб активным по умолчанию
        buttons[0].classList.add('active');
        contents[0].classList.add('active');
    });
});





// Модальные окна
function createModal(modalElement, openButtons, closeButton) {
    // Открываем модальное окно при клике на кнопку(и)
    openButtons.forEach(function (openButton) {
        openButton.onclick = function () {
            showModal(modalElement);
        }
    });

    // Закрываем модальное окно при клике на крестик
    closeButton.onclick = function () {
        closeModal(modalElement);
    }

    // Закрываем модальное окно при клике на затемненный фон
    window.onclick = function (event) {
        if (event.target == modalElement) {
            closeModal(modalElement);
        }

    }

    // Функция для показа модального окна - с анимацией
    function showModal(modalElement) {
        modalElement.style.display = 'block';
        setTimeout(function () {
            modalElement.classList.add('show');
            document.body.classList.add('no-scroll');
        }, 10); // Задержка для активации анимации
    }

    // Функция для закрытия модального окна - с анимацией
    function closeModal(modalElement) {
        modalElement.classList.remove('show');
        setTimeout(function () {
            modalElement.style.display = 'none';
            document.body.classList.remove('no-scroll');
        }, 300); // Задержка для завершения анимации
    }
}



// Проверка элемента на наличие его в DOM 
if (document.querySelector('#modal')) {
    // Модальное окно для обратного зовнка
    const modalConsult = document.getElementById('modal');
    const openModalConsultBtn = document.querySelectorAll('.openModal'); // Выбираем все кнопки с классом 'openModal'
    const closeModalConsultBtn = document.getElementById('modalCloseBtn');

    createModal(modalConsult, openModalConsultBtn, closeModalConsultBtn);
}

// Проверка элемента на наличие его в DOM 
if (document.querySelector('#modalGallery')) {
    // Модальное окно для обратного зовнка
    const modalConsult = document.getElementById('modalGallery');
    const openModalConsultBtn = document.querySelectorAll('.openModalGallery'); // Выбираем все кнопки с классом 'openModal'
    const closeModalConsultBtn = document.getElementById('modalGalleryCloseBtn');

    createModal(modalConsult, openModalConsultBtn, closeModalConsultBtn);
}