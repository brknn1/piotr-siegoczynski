document.addEventListener('DOMContentLoaded', () => {
    // Анимация появления элементов при скролле
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.power-block, .welcome, .quote, .timeline-item, .testimonial, .personal-life, .tile, .article');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    };

    // Добавляем класс для анимации при загрузке страницы
    window.addEventListener('load', () => {
        document.querySelector('.hero-content').classList.add('animate');
        document.querySelector('.portrait-section').classList.add('animate');
    });

    // Обработчик скролла
    window.addEventListener('scroll', animateOnScroll);

    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Анимация для timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
        item.style.transition = `opacity 0.5s ease, transform 0.5s ease ${index * 0.2}s`;
    });

    // Анимация для отзывов
    const testimonials = document.querySelectorAll('.testimonial');
    testimonials.forEach((testimonial, index) => {
        testimonial.style.opacity = '1';
        testimonial.style.transform = 'translateY(0)';
        testimonial.style.transition = `opacity 0.5s ease, transform 0.5s ease ${index * 0.2}s`;
    });

    // Слайдер
    const slider = document.querySelector('.slider');
    if (!slider) return;

    const slides = document.querySelectorAll('.slide');
    const indicators = document.querySelectorAll('.indicator');
    if (!slides.length || !indicators.length) return;

    let currentSlide = 0;
    let slideInterval;

    function updateSlide(index) {
        // Обновляем слайды
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('active');
                slide.classList.remove('prev');
            } else if (i < index) {
                slide.classList.add('prev');
                slide.classList.remove('active');
            } else {
                slide.classList.remove('active', 'prev');
            }
        });

        // Обновляем индикаторы
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide(currentSlide);
    }

    // Инициализация
    updateSlide(0);

    // Запускаем автоматическую смену слайдов
    slideInterval = setInterval(nextSlide, 10000);

    // Обработчики для индикаторов
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentSlide = index;
            updateSlide(currentSlide);
            // Сбрасываем таймер
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 10000);
        });
    });

    // Очистка при размонтировании
    window.addEventListener('beforeunload', () => {
        clearInterval(slideInterval);
    });

    // Обработка формы подписки на рассылку
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = newsletterForm.querySelector('input[type="email"]').value;
            // Здесь можно добавить отправку email на сервер
            alert('Dziękujemy za zapisanie się do newslettera!');
            newsletterForm.reset();
        });
    }

    // Обработка формы контакта
    const contactForm = document.querySelector('.contact-section form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = {
                name: contactForm.querySelector('input[type="text"]').value,
                email: contactForm.querySelector('input[type="email"]').value,
                message: contactForm.querySelector('textarea').value
            };

            // Здесь можно добавить отправку данных на сервер
            console.log('Form data:', formData);
            
            alert('Dziękujemy za wiadomość! Skontaktujemy się z Tobą wkrótce.');
            contactForm.reset();
        });
    }
}); 