//В этой директиве мы будем отслеживать пересечения
export default{
    mounted(el, binding){
        const options = {
            rootMargin: '0px',
            threshold: 1.0
        }
        const callback = (entries, observer) => {
            //Эта коллбек функция следит за моментом, когда мы долистываем до конца
            // И в этот момент выполняет функцию подгрузки остальных данных с сервера
            if(entries[0].isIntersecting){
                binding.value()
            }
        }
        const observer = new IntersectionObserver(callback, options)
        //observer наблюдает за всей страницей, и мы ему говорим, за пересечением каких элементов нужно следить
        observer.observe(el)
    },
    name: 'intersection'
}