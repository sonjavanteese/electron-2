<script>
  import Page from "$lib/windi/Page.svelte";
  import Loader from "$lib/windi/Loader.svelte";
  import { Modal, Content, Trigger } from "sv-popup";
  import EditBar from "$lib/windi/EditBar.svelte";
  import { fetch_south_park, _south_park, supabase } from "$lib/data";
  import { page } from "$app/stores";
  let open = false;
  let daten = {};
  let promise;
  let loading;
  const getData = () => {
    fetch_south_park($page.params.id).then((data) => {
      daten = data;
      return data;
    });
  };
  const updateData = async (dataEl) => {
    loading = true;
    try {
      const { data, error } = await supabase
        .from("south_park")
        .update({
          titel: dataEl.titel,
          name: dataEl.name,
          st: dataEl.st,
          ep: dataEl.ep,
          tags: dataEl.tags,
          assets: dataEl.assets,
        })
        .eq("id", dataEl.id);
    } catch (err) {
      console.log(err);
    } finally {
      reload();  
      loading = false;
    }
  };

  const update = () => {
    updateData(daten);
  };
  const reload = () => {
    _south_park.fetchAll();
  };
  promise = getData();
</script>

<!--   <PopModal bind:open>
    <div class="w-full text-left">
      <pre class="overflow-auto">{JSON.stringify(dataDetail, null, 2)}</pre>
    </div>
  </PopModal> -->

<Page>
  <header class="px-4 py-4 text-center bg-red-600 text-white">
    <hgroup class="space-y-4 py-4">
      <h4>Edit Modus</h4>
      <p class="space-x-2">
        <a
          href="/serien/editor"
          on:click|preventDefault={() => history.back()}
          class="btn shadow">Back</a
        >
        <a href="/serien/editor" class="btn shadow">List</a>
      </p>
    </hgroup>
  </header>
  <hr />
  <section class="container mx-auto px-2">
    <div class="py-4">
      {#await promise}
        <Loader />
      {:then value}
        <!-- ep,titel,name,st,tags,id,assets -->

        <div class="mb-1">
          <label for="sw1" class="label">Titel</label>
          <input
            type="text"
            class="form-control"
            id="sw1"
            value={daten.titel}
            placeholder="Titel"
            on:blur={(e) => {
              daten.titel = e.currentTarget.value;
            }}
          />
          <small class="text-muted sr-only">Episoden Titel</small>
        </div>
   

        <footer class="flex py-2 space-x-2">
          <Modal small={true}>
            <Content>
              <div class="mr-2 mt-2 w-full">
                <EditBar
                  class=" bg-white rounded-lg"
                  title={daten.titel}
                  content={daten}
                />
              </div>
            </Content>
            <Trigger>
              <button
                class="flex w-10 h-10 items-center justify-center shadow rounded"
                ><i class="gg-attachment" /></button
              >
            </Trigger>
          </Modal>

        </footer>
      {:catch error}
        <div>
          <h1 class="text-red-600">Error</h1>
          <pre>{(JSON.stringify(error), null, 2)}</pre>
        </div>
      {/await}
    </div>
  </section>
</Page>

<style>
  @import "../../../assets/enter.css";
  @import "../../../assets/attachment.css";
</style>
