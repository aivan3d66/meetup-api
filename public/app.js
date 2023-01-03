const meetupItem = document.querySelector("#meetup-item");

if (meetupItem) {
  meetupItem.addEventListener("click", event => {

    if (event.target.classList.contains("js-remove")) {
      const id = event.target.dataset.id;

      fetch("/meetup/remove/" + id, {
        method: "delete",
      }).then(() => {
        window.location.href = '/meetup';
      });
    }
  });
}
