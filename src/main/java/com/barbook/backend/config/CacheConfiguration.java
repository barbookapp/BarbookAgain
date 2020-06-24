package com.barbook.backend.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import org.hibernate.cache.jcache.ConfigSettings;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, com.barbook.backend.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, com.barbook.backend.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, com.barbook.backend.domain.User.class.getName());
            createCache(cm, com.barbook.backend.domain.Authority.class.getName());
            createCache(cm, com.barbook.backend.domain.User.class.getName() + ".authorities");
            createCache(cm, com.barbook.backend.domain.Bottle.class.getName());
            createCache(cm, com.barbook.backend.domain.Bottle.class.getName() + ".spirits");
            createCache(cm, com.barbook.backend.domain.Bottle.class.getName() + ".categories");
            createCache(cm, com.barbook.backend.domain.Bottle.class.getName() + ".subCategories");
            createCache(cm, com.barbook.backend.domain.Bottle.class.getName() + ".primaryBarrels");
            createCache(cm, com.barbook.backend.domain.Bottle.class.getName() + ".secondaryBarrels");
            createCache(cm, com.barbook.backend.domain.Bottle.class.getName() + ".brands");
            createCache(cm, com.barbook.backend.domain.Bottle.class.getName() + ".distilleries");
            createCache(cm, com.barbook.backend.domain.Spirit.class.getName());
            createCache(cm, com.barbook.backend.domain.Spirit.class.getName() + ".bottles");
            createCache(cm, com.barbook.backend.domain.Category.class.getName());
            createCache(cm, com.barbook.backend.domain.Category.class.getName() + ".bottles");
            createCache(cm, com.barbook.backend.domain.SubCategory.class.getName());
            createCache(cm, com.barbook.backend.domain.SubCategory.class.getName() + ".bottles");
            createCache(cm, com.barbook.backend.domain.PrimaryBarrel.class.getName());
            createCache(cm, com.barbook.backend.domain.PrimaryBarrel.class.getName() + ".bottles");
            createCache(cm, com.barbook.backend.domain.SecondaryBarrel.class.getName());
            createCache(cm, com.barbook.backend.domain.SecondaryBarrel.class.getName() + ".bottles");
            createCache(cm, com.barbook.backend.domain.Distillery.class.getName());
            createCache(cm, com.barbook.backend.domain.Distillery.class.getName() + ".parents");
            createCache(cm, com.barbook.backend.domain.Distillery.class.getName() + ".brands");
            createCache(cm, com.barbook.backend.domain.Distillery.class.getName() + ".bottles");
            createCache(cm, com.barbook.backend.domain.Brand.class.getName());
            createCache(cm, com.barbook.backend.domain.Brand.class.getName() + ".parents");
            createCache(cm, com.barbook.backend.domain.Brand.class.getName() + ".bottles");
            createCache(cm, com.barbook.backend.domain.Brand.class.getName() + ".distilleries");
            createCache(cm, com.barbook.backend.domain.Parent.class.getName());
            createCache(cm, com.barbook.backend.domain.Parent.class.getName() + ".brands");
            createCache(cm, com.barbook.backend.domain.Parent.class.getName() + ".distilleries");
            createCache(cm, com.barbook.backend.domain.UserHistory.class.getName());
            createCache(cm, com.barbook.backend.domain.UserHistory.class.getName() + ".bottles");
            createCache(cm, com.barbook.backend.domain.Bottle.class.getName() + ".userHistories");
            createCache(cm, com.barbook.backend.domain.MyBook.class.getName());
            createCache(cm, com.barbook.backend.domain.Favorite.class.getName());
            createCache(cm, com.barbook.backend.domain.Favorite.class.getName() + ".userHistories");
            createCache(cm, com.barbook.backend.domain.Favorite.class.getName() + ".myBooks");
            createCache(cm, com.barbook.backend.domain.MyBook.class.getName() + ".favorites");
            createCache(cm, com.barbook.backend.domain.UserHistory.class.getName() + ".myBooks");
            createCache(cm, com.barbook.backend.domain.MyBook.class.getName() + ".bottles");
            createCache(cm, com.barbook.backend.domain.Bottle.class.getName() + ".myBooks");
            createCache(cm, com.barbook.backend.domain.Bottle.class.getName() + ".favorites");
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache == null) {
            cm.createCache(cacheName, jcacheConfiguration);
        }
    }

}
