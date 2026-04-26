<template>
  <main class="pt-28 pb-20">
    <SectionHero
      kicker="Contact Jianyi"
      title="我们期待与你沟通"
      subtitle="合作、课程、活动，一站式联络"
      description="保留现有邮箱、电话、地址与合作方向信息。"
    />

    <section class="max-w-[1200px] mx-auto px-6 lg:px-12">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        <div>
          <div class="space-y-4 text-sm text-bamboo-deep">
            <p><span class="font-bold text-ink-base">邮箱：</span>contact@jianyi.art</p>
            <p><span class="font-bold text-ink-base">电话：</span>400-888-2026</p>
            <p><span class="font-bold text-ink-base">地址：</span>杭州市西湖区文创园 A2 - 剪艺数字实验室</p>
          </div>
        </div>

        <div class="bg-paper-light border border-paper-dark/60 rounded-2xl p-8 md:p-10">
          <h2 class="text-2xl font-medium tracking-tight mb-6">合作方向</h2>
          <ul class="space-y-4 text-bamboo-dark text-sm leading-relaxed">
            <li>· 城市文旅与非遗展陈设计</li>
            <li>· 企业品牌礼品与节庆衍生品定制</li>
            <li>· 学校与机构的传统工艺课程合作</li>
            <li>· 线上线下主题活动共创</li>
          </ul>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import SectionHero from '@/components/SectionHero.vue'
</script>
