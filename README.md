# Интенсив "Свой Вилберис на JavaScript"

>ДЗ1:
При клике мимо корзины реализовать закрытие корзины (желательно использовать делегирование)

```
document.querySelector('body').addEventListener('click', function(event) {  
    if (event.target.classList.contains('overlay')) {  
        closeModal();  
    }  
});
```
