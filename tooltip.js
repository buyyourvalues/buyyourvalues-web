BYV.template = _.template($('#google_map_tooltip_tmp').html(););
$('#byv_tooltip').html(BYV.template());

<script type="text/jst" id="google_map_tooltip_tmp">
<% BYV.tooltip_iter = 0; %>
<h2 id="tooltip_title"><%= BYV.current_biz.business_name  %></h2>
  <ul id="tooltip_contributions">
    <% _.each(BYV.current_biz.contributions,function(c){  %>
      <li class="tooltip_item <%= BYV.tooltip_iter % 2 === 0 ? 'even' : 'odd'  %>"><%= c.amount  %> | <%= c.party  %></li>
      <% tooltip_iter ++; %>
    <% }); %>
  <ul>
</script>
