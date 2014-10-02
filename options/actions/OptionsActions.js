var AppDispatcher = require('common/AppDispatcher');
var OptionsConstants = require('./OptionsConstants');

var OptionsActions = {

  addNewLink: function(linkType) {
    AppDispatcher.handleViewAction({
      actionType : OptionsConstants.ADD_NEW_LINK,
      linkType : linkType
    });
  },

  updateLinkField : function(linkType, index, field, value) {
    AppDispatcher.handleViewAction({
      actionType : OptionsConstants.UPDATE_LINK_FIELD,
      linkType : linkType,
      index : index,
      field : field,
      value : value
    });
  },

  removeLinkRow : function(linkType, index) {
    AppDispatcher.handleViewAction({
      actionType : OptionsConstants.REMOVE_LINK_ROW,
      linkType : linkType,
      index : index
    });
  },

  reverseToLinkDefaults : function(linkType) {
    AppDispatcher.handleViewAction({
      actionType : OptionsConstants.REVERSE_TO_LINK_DEFAULTS,
      linkType : linkType
    });
  }

};

module.exports = OptionsActions;