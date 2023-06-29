<script lang="ts">
  import ItemDetail from '$lib/components/ItemDetailPage.svelte';
  import { onMount } from 'svelte';
  import { Button, Modal } from 'flowbite-svelte';

  export let data;
  $: item = data.content as any;
  $: user = data.user as any;

  $: commentError = null;
  $: userComment = '';
  $: comments = null;

  $: showModal = false;
  $: modalTitle = 'Error';
  $: modalMessage = '';
  function openModal(title: string, message: string) {
    modalTitle = title;
    modalMessage = message;
    showModal = true;
  }

  async function submitComment() {
        commentError = null;

        const response = await fetch('/api/utility/comment/create', {
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

    async function addToCart() {
      const response = await fetch('/api/cart/add', {
        method: 'POST',
        body: JSON.stringify({
          utility_id: item.id
        })
      });

      if (response.status !== 200) {
        openModal('Error', 'Error adding item to cart');
        return;
      }

      openModal('Success', 'Item added to cart');
    }

    async function loadComments() {
        const response = await fetch('/api/utility/comment/list', {
            method: 'POST',
            body: JSON.stringify({
                id: item.id
            })
        });

        const content = await response.json();

        if (response.status !== 200) {
            commentError = content.message;
        }

        comments = content.data;
    }

  onMount(async () => {
    await loadComments();
  });
</script>

<ItemDetail {user} {item} bind:userComment={userComment} {comments} {submitComment} {commentError} {addToCart}/>

<Modal title={modalTitle} bind:open={showModal} autoclose outsideclose>
    <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
      {modalMessage}
    </p>
    <svelte:fragment slot='footer'>
      <Button>Close</Button>
    </svelte:fragment>
  </Modal>