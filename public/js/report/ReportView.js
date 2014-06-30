'use strict';

var _ = require('underscore');
var Marionette = require('marionette');
var fs = require('fs');
var layoutTemplate = fs.readFileSync(__dirname + '/report.html', 'utf8');
var moment = require('moment');

var days = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье'
];

var groups = require('../../../groups'); // that's really crazy!
var columns = _.reduce(groups, function (memo, group) {
  return memo + ['<td><%=', group.name, '%></td>'].join('');
}, '');

var RowView = Marionette.ItemView.extend({
  tagName: 'tr',
  template: _.template('<td> <%=getDay(day)%> </td><td> <%=calls%></td>' + columns),
  templateHelpers: {
    getDay: function (day) {
      return days[day];
    }
  }
});


var columnNames = _.reduce(groups, function (memo, group) {
  return memo + ['<th>', group.humanName, '</th>'].join('');
}, '');

var GridView = Marionette.CompositeView.extend({
  template: _.template('<table class="table"><thead><tr><th class="col-xs-2">День недели</th><th>Всего звонков</th>' + columnNames + '</tr></thead><tbody></tbody></table>'),
  childViewContainer: 'tbody',
  childView: RowView
});

require('bootstrap-datepicker');
var tmplFilter = fs.readFileSync(__dirname + '/filter.html', 'utf8');
var FiltersView = Marionette.ItemView.extend({
  template: _.template(tmplFilter),
  events: {
    'change .datepicker': 'onChange',
    'hide .datepicker': 'onDateSelected'
  },
  onDateSelected: function () {
    if (this.startDate && this.endDate) {
      var dates = _.map([this.startDate, this.endDate], function (str) {
        return moment(str, 'DD/MM/YYYY').toISOString();
      });
      this.model.set({
        from_date: dates[0],
        to_date: dates[1]
      });
    }
  },
  setInputDate: function (date) {
    var startDate = this.startDate = moment(date).startOf('week');
    var endDate = this.endDate = moment(date).endOf('week');
    var format = 'DD/MM/YYYY';
    this.$('.datepicker').val([startDate.format(format), endDate.format(format)].join(' - '));
  },
  onChange: function () {
    var date = this.$('.datepicker').data('datepicker').dates[0];
    if (date) {
      this.setInputDate(date);
    }
  },
  onRender: function () {
    this.$('.datepicker').datepicker({
      language: 'ru',
      selectWeek: true
    });
  }
});

var ReportView = Marionette.LayoutView.extend({
  template: _.template(layoutTemplate),
  className: 'container',
  regions: {
    filters: '.filters',
    grid: '.grid'
  },
  initialize: function (options) {
    this.filter = options.filter;
  },
  onShow: function () {
    this.filters.show(new FiltersView({
      model: this.filter
    }));
    this.grid.show(new GridView({
      collection: this.collection
    }));
  }
});

module.exports = ReportView;
