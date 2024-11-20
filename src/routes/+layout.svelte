<script>import Header from './Header.svelte';
import "../app.css"


    import { page } from '$app/stores';
    import { ModeWatcher } from 'mode-watcher';
let isAdminpage = $page.url.pathname.startsWith('/admin');

let { children } = $props();</script>

<div class="app">

	<ModeWatcher/>
	
	{#if !isAdminpage}
    <Header /> <!-- Your user-specific navbar -->
  {/if}

	<main>
		{@render children()}
	</main>


</div>



