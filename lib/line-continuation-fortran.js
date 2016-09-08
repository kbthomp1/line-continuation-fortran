'use babel';

import LineContinuationFortranView from './line-continuation-fortran-view';
import { CompositeDisposable } from 'atom';

export default {

  lineContinuationFortranView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.lineContinuationFortranView = new LineContinuationFortranView(state.lineContinuationFortranViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.lineContinuationFortranView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'line-continuation-fortran:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.lineContinuationFortranView.destroy();
  },

  serialize() {
    return {
      lineContinuationFortranViewState: this.lineContinuationFortranView.serialize()
    };
  },

  toggle() {
    console.log('LineContinuationFortran was toggled!');

    if (this.modalPanel.isVisible()) {
      this.modalPanel.hide();
    } else {
      editor = atom.workspace.getActiveTextEditor();
      words = editor.getText().split(/\s+/).length;
      this.LineContinuationFortranView.setCount(words);
      this.modalPanel.show();
    }
  }

  setCount(count) {
    displayText = "There are #{count} words."
    this.element.children[0].textContent = displayText
  }

};
