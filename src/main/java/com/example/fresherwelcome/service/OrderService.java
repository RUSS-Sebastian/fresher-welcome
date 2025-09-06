package com.example.fresherwelcome.service;

import com.example.fresherwelcome.dto.*;
import com.example.fresherwelcome.mapper.sortFieldMapper;
import com.example.fresherwelcome.model.*;
import com.example.fresherwelcome.repository.*;
import org.apache.catalina.Store;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private final OrderRepo orderRepository;
    private final OrderItemRepo orderItemRepository;
    private final UserRepo userRepository;
    private final FoodBusinessRepo shopRepository;
    private final FoodRepo foodRepository;
    private final UserMessageRepo messageRepository;

    public OrderService(OrderRepo orderRepository,
                        OrderItemRepo orderItemRepository,
                        UserRepo userRepository,
                        FoodBusinessRepo shopRepository,
                        FoodRepo foodRepository,
                        UserMessageRepo messageRepo) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.userRepository = userRepository;
        this.shopRepository = shopRepository;
        this.foodRepository = foodRepository;
        this.messageRepository = messageRepo;
    }

    @Transactional
    public Order createOrder(CartDto cartDto) {

        // 1️⃣ Load user and shop
        User user = userRepository.findById(cartDto.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        FoodBusiness shop = shopRepository.findById(cartDto.getShopId())
                .orElseThrow(() -> new RuntimeException("Shop not found"));

        // 2️⃣ Prepare order
        Order order = new Order();
        order.setUser(user);
        order.setShop(shop);
        order.setCreatedAt(LocalDateTime.now());
        order.setTotalAmount(BigDecimal.ZERO);// will calculate after items
        order.setStatus(Marking.UNMARKED);

        Order savedOrder = orderRepository.save(order);

        // 3️⃣ Prepare items
        BigDecimal totalAmount = BigDecimal.ZERO;
        for (CartItemDto dto : cartDto.getItems()) {
            Food food = foodRepository.findById(dto.getFoodId())
                    .orElseThrow(() -> new RuntimeException("Food not found"));

            BigDecimal subtotal = food.getFoodPrice().multiply(BigDecimal.valueOf(dto.getQuantity()));
            totalAmount = totalAmount.add(subtotal);

            OrderItem item = new OrderItem();
            item.setOrder(savedOrder);
            item.setFood(food);
            item.setQuantity(dto.getQuantity());
            item.setPrice(food.getFoodPrice());
            item.setSubtotal(subtotal);

            orderItemRepository.save(item);
        }

        // 4️⃣ Update total
        savedOrder.setTotalAmount(totalAmount);
        User businessOwner = shop.getUser(); // because FoodBusiness has @OneToOne User
        if (businessOwner != null) {
            UserMessage message = new UserMessage();
            message.setUser(businessOwner);
            message.setTitle("Received an Order");
            message.setContent("You received an order from user ID: " + user.getId());
            message.setStatus(MessageStatus.UNREAD);
            messageRepository.save(message);
        }

        return orderRepository.save(savedOrder);
    }

    public Page<OrderViewDto> getAllUnmarkedOrders(Long shopId, int page, int size, String sortBy, String direction) {
        sortBy = sortFieldMapper.mapOrder(sortBy);

        Sort sort = direction.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Order> pPage = orderRepository.findByShop_BusinessIdAndStatus(shopId, Marking.UNMARKED, pageable);

        return pPage.map(order -> {
            OrderViewDto dto = new OrderViewDto();
            dto.setOrderId(order.getOrderId());
            dto.setUserId(order.getUser().getId());
            dto.setTotalAmount(order.getTotalAmount());
            dto.setCreatedAt(order.getCreatedAt());

            // ✅ Use OrderItemViewDto instead of OrderItemDto
            List<OrderItemViewDto> items = order.getOrderItems().stream()
                    .map(item -> new OrderItemViewDto(item.getFood().getFoodName(), item.getQuantity()))
                    .collect(Collectors.toList());
            dto.setItems(items);

            return dto;
        });

    }

    @Transactional
    public void markOrder(Long orderId) {
        // Fetch the order
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));

        // Only mark if currently UNMARKED
        if (order.getStatus() == Marking.UNMARKED) {
            order.setStatus(Marking.MARKED);
            orderRepository.save(order); // optional with @Transactional
        }
    }





}
