<script>
  import ItemDetail from '$lib/components/ItemDetailPage.svelte';

  export let data;
  $: item = data.content;

</script>

<ItemDetail {item} />