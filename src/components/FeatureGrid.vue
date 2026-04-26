<script setup>
defineProps({
  items: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <section class="feature-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <article
      v-for="item in items"
      :key="item.id"
      class="feature-grid__card bg-paper-base border border-bamboo-soft rounded-xl p-6 hover:shadow-lg hover:border-bamboo-base transition-all duration-300"
    >
      <h3 class="feature-grid__title text-xl font-semibold text-ink-base mb-3">{{ item.title }}</h3>
      <p class="feature-grid__description text-sm text-bamboo-dark leading-relaxed">{{ item.description }}</p>
    </article>
  </section>
</template>
