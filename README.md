# z-vue-sidebar

Insert a Siddebar to the page.

Example code:

```
<sidebar headerhref="/" headertitle="Susy System" subheadertitle="Immobilienportal" closetitle="Sidebar schließen" footer>				
  <smenu :entries="[{icon: 'home', route: 'route', label: 'Link'}]" title="Main Menu"></smenu>
  <ul slot="footer">
	  <footerlink route="config" tooltip="Tooltip1" icon="cog"></footerlink>
		<footerlink href="/logout" tooltip="Tooltip2" icon="sign-out"></footerlink>
	</ul>
</sidebar>
```

# Sidebar Properties

### headerhref
Where to link to when header is clicked (usually "/", which is the welcome page)

### headertitle
Text in the title

### subheadertitle
Text in the subtitle (smaller text below the title), not clickable

### closetitle
Tooltip for the close / open buttton ("Hamburger icon")

### footer
This is a boolean value. You should set this when you use the footer-slot inside the sidebar (see example above)

