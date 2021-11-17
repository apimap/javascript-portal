export function scrollToPageTop() {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
}

export function scrollToComponentWithHistory(owner, refName){
    if (owner.$router.history.current.hash !== `#${refName}`) {
        owner.$router.push(`#${refName}`);
    }
    scrollToComponentWithoutHistory(owner, refName);
}

export function scrollToComponentWithoutHistory(owner, refName){
    if(Array.isArray(owner.$refs[refName])){
        owner.$refs[refName][0].$el.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
        });
    }else if(owner.$refs[refName].$el === undefined) {
        owner.$refs[refName].scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
        });
    }else{
        owner.$refs[refName].$el.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
        });
    }
}