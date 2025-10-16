# replace-assets

<div class="markdown-syntax">

![asset](/images/replace-assets/foo.png)
![asset](/images/replace-assets/foo.jpg)
![asset](/images/replace-assets/foo.gif)

</div>

<div class="element-syntax">

<img src="/images/replace-assets/foo.png" alt="asset">
<img src="/images/replace-assets/foo.jpg" alt="asset">
<img src="/images/replace-assets/foo.gif" alt="asset">

</div>

<div ref="imgRef" class="append-img" />

<script setup lang="ts">
import { onMounted, shallowRef } from 'vue'

const imgRef = shallowRef(null)
onMounted(() => {
  if (!imgRef.value)
    return
  const img = document.createElement('img')
    img.src = '/images/replace-assets/foo.png'
    imgRef.value.appendChild(img)
})
</script>
