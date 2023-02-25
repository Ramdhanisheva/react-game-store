const scrollToPrev = (index, length, ref) => {
    const listNode = ref.current
    const isFirstSlide = index == 0
    const newIndex = isFirstSlide ? length - 1 : index - 1 
    const imgNode = listNode.querySelectorAll('.carousel-item')[newIndex] 
    console.log(imgNode)
    imgNode.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    })
}

  const scrollToNext = (index, length, ref) => {
    const listNode = ref.current
    const isLastSlide = index == length - 1
    const newIndex = isLastSlide ? 0 : index + 1 
    const imgNode = listNode.querySelectorAll('.carousel-item')[newIndex] 
    console.log(imgNode)
    imgNode.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    })
  }

  const scrollToExact = (index, length, ref) => {
    const listNode = ref.current
    const imgNode = listNode.querySelectorAll('.carousel-item')[index] 
    console.log(imgNode)
    imgNode.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    })
  }

  export {scrollToNext, scrollToPrev, scrollToExact}