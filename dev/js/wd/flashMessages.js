/* global werneo */

function WerneoFlashMessages(){
	
	this.queue = null;
	this.id = 1;

	WerneoFlashMessages.prototype.dismiss = function(id){
		var _this = this;

		_this.queue.querySelector('#flash-message-' + id).classList.remove('active');
	};

	WerneoFlashMessages.prototype.show = function(id){
		var _this = this;

		_this.queue.querySelector('#flash-message-' + id).classList.add('active');
		/// enable listener to dismiss message
        _this.queue.querySelector('#flash-message-' + id + '-close').addEventListener('click',function(){
			_this.dismiss(id);
        });
	};

	WerneoFlashMessages.prototype.getMessageHtml = function(content,type,id){
		var html = '<div class="' + type + ' flash-message" id="flash-message-' + id + '">';
		html += content;
		html += '<span class="close" id="flash-message-' + id + '-close">&times;</span>';
		html += '</div>';

		return html;
	};

	WerneoFlashMessages.prototype.createMessage = function(content,type){
		var _this = this;
		var id = _this.id++;
        
        /// add flash message into the queue
        _this.queue.innerHTML = _this.getMessageHtml(content,type,id) + _this.queue.innerHTML;
        /// activate message
        setTimeout(function(){
			_this.show(id);
        },100);
        /// automatically dismiss message after 5 s
        setTimeout(function(){
			_this.dismiss(id);
        },5100);
	};

	WerneoFlashMessages.prototype.invoke = function(){
		var _this = this;

		/// append queue if not present
        if(null === document.getElementById('flash-message-queue')){
            document.querySelector('body').innerHTML += '<div id="flash-message-queue" class="flash-message-queue"></div>';
        }
        _this.queue = document.getElementById('flash-message-queue');
	};

}

/// register plugin to Werneo core
werneo.registerPlugin('flashMessages',new WerneoFlashMessages());