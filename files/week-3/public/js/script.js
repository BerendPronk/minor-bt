(function() {
	var inputs = document.getElementsByTagName('input');
	var labels = document.getElementsByTagName('label');
	var feedback = document.getElementById('feedback');

	// Toggles green background as feedback when user clicks on a product-label
	for (var i = 0; i < inputs.length; i++) {
		inputs[i].onclick = function() {
			if (this.parentNode.className !== 'active') {
				this.parentNode.className = 'active';
			} else {
				this.parentNode.className = '';
			}
		}
	}

	// Prevents every active product from being dragged again, to prevent duplicates in the list
	for (var i = 0; i < labels.length; i++) {
		if (labels[i].className === 'active') {
			labels[i].draggable = false;
			labels[i].getElementsByTagName('input')[0].checked = true;
		}
	}

	// Detects if browser is capable of dragging elements
	if ('draggable' in document.createElement('p')) {
		var listZone = document.querySelector('#list');
		var submit = document.querySelector('#submit');

		submit.className = 'hidden';
		feedback.className = 'hidden';

		/*
			Source: Liam, at stackoverflow
			http://stackoverflow.com/questions/133925/javascript-post-request-like-a-form-submit
		*/
		// Creates and submits an invisible form to mimic a post-request
		function post(path, params) {
			var form = document.createElement('form');
			form.setAttribute('method', 'POST');
			form.setAttribute('action', path);
			form.className = 'hidden';

			for (var key in params) {
				if (params.hasOwnProperty(key)) {
					var hiddenField = document.createElement('input');
					hiddenField.setAttribute('name', key);
					hiddenField.setAttribute('value', params[key]);

					form.appendChild(hiddenField);
				}
			}

			document.body.appendChild(form);
			form.submit();
		}

		// Loops through all the product-labels
		for (var i = 0; i < labels.length; i++) {
			// Hides input contained in label
			labels[i].getElementsByTagName('input')[0].className = 'hidden';

			// Shows update-button when user decides to click a product, instead of dragging it, by removing the 'hidden' classname
			labels[i].onclick = function() {
				submit.className = '';
			}

			labels[i].ondragstart = function(e) {
				// Sets product-name as transferable data when dragged
				e.dataTransfer.setData('text', e.target.innerText);

				// Provides user with feedback on where to drop product-label
				list.className = 'section feedback drag';
			}
		}

		// Creates a list-item when a product-label is dropped in the list
		listZone.ondrop = function(e) {
			var list = e.target.querySelector('ul');
			var curItems;
			var newItems = [];
			var li = document.createElement('li');
			li.innerText = e.dataTransfer.getData('text');

			list.appendChild(li);

			curItems = list.querySelectorAll('li');
			for (var i = 0; i < curItems.length; i++) {
				newItems.push(curItems[i].innerText);
			}

			post('/list', {
				product: newItems
			});

			e.preventDefault();
		}

		// Disables default lock on drag-over and provides user with feedback to drop item
		listZone.ondragover = function(e) {
			list.className = 'section feedback drop';
			e.preventDefault();
		}

		// Resets feedback to 'drag'-feedback
		listZone.ondragleave = function(e) {
			list.className = 'section feedback drag';
			e.preventDefault();
		}
	}
})();