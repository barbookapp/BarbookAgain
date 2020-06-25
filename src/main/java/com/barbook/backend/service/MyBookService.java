package com.barbook.backend.service;

import com.barbook.backend.domain.Bottle;
import com.barbook.backend.domain.MyBook;
import com.barbook.backend.domain.UserHistory;
import com.barbook.backend.repository.MyBookRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.barbook.backend.repository.UserHistoryRepository;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class MyBookService {

    private final Logger log = LoggerFactory.getLogger(MyBookService.class);
    private final BottleService bottleService;
    private final MyBookRepository myBookRepository;
    private final UserHistoryRepository userHistoryRepository;

    public MyBookService(BottleService bottleService, MyBookRepository myBookRepository, UserHistoryRepository userHistoryRepository) {
        this.bottleService = bottleService;
        this.myBookRepository = myBookRepository;
        this.userHistoryRepository = userHistoryRepository;
    }

    public MyBook save(MyBook myBook) {
        log.debug("Request to save MyBook : {}", myBook);
        return myBookRepository.save(myBook);
    }
    /**
     * Get all the myBooks.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<MyBook> findAll() {
        log.debug("Request to get all ShoppingCarts");
        return myBookRepository.findAll();
    }
    /**
     * Get one shoppingCart by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<MyBook> findOne(Long id) {
        log.debug("Request to get ShoppingCart : {}", id);
        return myBookRepository.findById(id);
    }
    /**
     * Delete the shoppingCart by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete ShoppingCart : {}", id);
        myBookRepository.deleteById(id);
    }

    public Optional<MyBook> findByUser(String user) {
        Optional<MyBook> myBookO = myBookRepository.findFirstByUserHistory(user);
        myBookO.ifPresent(myBook -> log.info("MyBook for user {}", user));
        return myBookO;
    }

    public MyBook addBottlesForUser(Long id, String user) throws EntityNotFoundException {
        Optional<MyBook> myBookOptional = findByUser(user);
        MyBook activeBook = myBookOptional.orElseGet(() -> {
            Optional<UserHistory> userHistory = userHistoryRepository.findOneByUserLogin(user);
            return myBookRepository.save(new MyBook(
                userHistory.get()
            ));
        });

        Bottle bottle = bottleService.findOne(id).orElseThrow(() -> new EntityNotFoundException("Bottle not found"));
        MyBook myBook;
        List<Bottle> myBottles = activeBook.getBottles().stream().filter(bottle1 -> bottle.getId().equals(id)).collect(Collectors.toList());
        if (!myBottles.contains(bottle)) {
            myBook = new MyBook();
            myBook.addBottle(bottle);
        }
        return myBookRepository.save(activeBook);
    }
}
