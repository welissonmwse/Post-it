const item_key = '@Postit:list_item'

document.addEventListener("DOMContentLoaded", () => {
	const postit = localStorage.getItem(item_key);
	const note_lists = postit ? JSON.parse(postit) : []

	note_lists.map(item => {
		renderPostit(item.id, item.title, item.content)
	})
})


document.querySelector('header button').addEventListener('click', () =>{
	createNewPostit()
})

function createNewPostit(){
	const id = new Date().getTime()
	const item = localStorage.getItem(item_key);
	const currentPostit = item ? JSON.parse(item) : []
	const newPostit = {
		id,
		title: 'Title',
		content: 'Text content',
	}
	const data = [
		...currentPostit,
		newPostit,
	]
	
	localStorage.setItem(item_key, JSON.stringify(data))
	renderPostit(newPostit.id, newPostit.title, newPostit.content)
}

function renderPostit(id, title, content){
	const li = document.createElement('li')
	li.setAttribute('data-item', id)
	li.innerHTML = `
		<a href='#' contenteditable="true" data-item="${id}">
			<h2>${title}</h2>
			<p>${content}</p>
			<div class='delete' data-item="${id}">x</div>
		</a>
	`
	const ul = document.querySelector('div ul')

	ul.appendChild(li)
  editPostit()
  deletePostit()
}

function editPostit(){
  document.querySelectorAll('li a').forEach(note => {
		note.addEventListener('keyup', () => {
      const postit = localStorage.getItem(item_key);
	    const note_lists = postit ? JSON.parse(postit) : []
			const note_title = note.querySelector('h2').innerText
			const note_content = note.querySelector('p').innerText
			const id = Number(note.getAttribute('data-item'))

			const current_notes = note_lists.filter(item => item.id !== id)
			
			const data = [
				...current_notes,
				{
					id,
					title: note_title,
					content: note_content,
				}
			]
			
			localStorage.setItem(item_key, JSON.stringify(data))
		})
		
	})
}

function deletePostit(){
  document.querySelectorAll('div.delete').forEach(item => {
		item.addEventListener('click', () => {
			const ul = document.querySelector('div ul') 
			const id = Number(item.getAttribute('data-item'))
      const postit = localStorage.getItem(item_key);
	    const note_lists = postit ? JSON.parse(postit) : []
			console.log(id)

			const li = document.querySelector(`[data-item="${id}"]`)
			
			ul.removeChild(li)
			
			const current_notes = note_lists.filter(item => item.id !== id)
      console.log(current_notes)
			
			const data = [
				...current_notes,
			]
			
			localStorage.setItem(item_key, JSON.stringify(data))
		})
		
	})
}
