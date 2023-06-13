<script lang="ts">
  import ItemDetail from '$lib/components/ItemDetailPage.svelte';
	import { onMount } from 'svelte';

  export let data;
  $: item = data.content as any;
  $: user = data.user as any;

  $: commentError = null;
  $: userComment = '';
  $: comments = null;

  async function submitComment() {
        commentError = null;

        const response = await fetch('/api/fish/comment/create', {
            method: 'POST',
            body: JSON.stringify({
                id: item.id,
                comment: userComment
            })
        });

        const content = await response.json();

        if (response.status !== 200) {
            commentError = content.message;
        }

        await loadComments();

        userComment = '';
    }

    async function loadComments() {
        const response = await fetch('/api/fish/comment/list', {
            method: 'POST',
            body: JSON.stringify({
                id: item.id
            })
        });

        const content = await response.json();

        if (response.status !== 200) {
            commentError = content.message;
        }

        console.log(content.data);

        comments = content.data;
    }

  onMount(async () => {
    await loadComments();
  });
</script>

<ItemDetail {user} {item} bind:userComment={userComment} {comments} {submitComment} {commentError}/>