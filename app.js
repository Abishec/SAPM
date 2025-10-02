// Portfolio Management Solution - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();
    createCharts();
});

function initializeApp() {
    setupSmoothScrolling();
    setupScrollAnimations();
    setupProgressBars();
    setupNavigation();
    setupCounterAnimations();
}

// Create all charts using Chart.js
function createCharts() {
    createPortfolioChart();
    createAllocationChart();
    createGrowthChart();
}

// Large Portfolio Pie Chart with Exact Data
function createPortfolioChart() {
    const ctx = document.getElementById('portfolioChart');
    if (!ctx) return;

    // Exact portfolio data from user's table
    const portfolioData = [
        { label: 'HDFC Mid Cap Fund', value: 25.0, percentage: 7.8 },
        { label: 'Parag Parikh Flexi Cap', value: 35.0, percentage: 11.0 },
        { label: 'ICICI Value Discovery', value: 40.0, percentage: 12.5 },
        { label: 'ICICI Thematic FoF', value: 25.0, percentage: 7.8 },
        { label: 'Nippon Nivesh Lakshya', value: 35.0, percentage: 11.0 },
        { label: 'Aditya Birla Balanced', value: 28.0, percentage: 8.8 },
        { label: 'Bank FD (6 months)', value: 70.0, percentage: 21.9 },
        { label: 'Bank FD (1 month)', value: 10.7, percentage: 3.4 },
        { label: 'PPF Self', value: 15.86, percentage: 5.0 },
        { label: 'PPF Daughter', value: 12.5, percentage: 3.9 },
        { label: 'PF Employer', value: 4.9, percentage: 1.5 },
        { label: 'Savings Account', value: 13.5, percentage: 4.2 },
        { label: 'HDFC Life Insurance', value: 3.5, percentage: 1.1 }
    ];

    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: portfolioData.map(item => item.label),
            datasets: [{
                data: portfolioData.map(item => item.value),
                backgroundColor: [
                    '#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F',
                    '#DB4545', '#D2BA4C', '#964325', '#944454', '#13343B',
                    '#FF6B6B', '#4ECDC4', '#45B7D1'
                ],
                borderWidth: 3,
                borderColor: '#ffffff',
                hoverBorderWidth: 4,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'right',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: {
                            size: 14,
                            weight: '500'
                        },
                        generateLabels: function(chart) {
                            const data = chart.data;
                            if (data.labels.length && data.datasets.length) {
                                return data.labels.map((label, index) => {
                                    const value = portfolioData[index].value;
                                    const percentage = portfolioData[index].percentage;
                                    return {
                                        text: `${label}: ₹${value}L (${percentage}%)`,
                                        fillStyle: data.datasets[0].backgroundColor[index],
                                        strokeStyle: data.datasets[0].borderColor,
                                        lineWidth: data.datasets[0].borderWidth,
                                        pointStyle: 'circle',
                                        index: index
                                    };
                                });
                            }
                            return [];
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: 'white',
                    bodyColor: 'white',
                    borderColor: '#1FB8CD',
                    borderWidth: 2,
                    cornerRadius: 8,
                    displayColors: true,
                    callbacks: {
                        label: function(context) {
                            const item = portfolioData[context.dataIndex];
                            return [
                                `Value: ₹${item.value} Lakhs`,
                                `Percentage: ${item.percentage}%`,
                                `Total Portfolio: ₹3,18,96,000`
                            ];
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });
}

// Asset Allocation Chart by Categories
function createAllocationChart() {
    const ctx = document.getElementById('allocationChart');
    if (!ctx) return;

    const allocationData = {
        'Equity Funds': 39,
        'Debt Funds': 50,
        'Hybrid Funds': 10,
        'Gold': 5
    };

    // Create detailed breakdown for tooltips
    const breakdownData = {
        'Equity Funds': [
            'Large Cap: 10%',
            'Mid Cap: 8%', 
            'Small Cap: 5%',
            'Flexi Cap: 6%',
            'ELSS: 6%',
            'Hybrid: 4%'
        ],
        'Debt Funds': [
            'Short Term Debt: 20%',
            'Liquid: 20%',
            'Long Term Debt: 10%'
        ],
        'Hybrid Funds': [
            'DSP Dynamic Asset Allocation: 5%',
            'ICICI Balanced Advantage: 5%'
        ],
        'Gold': [
            'Axis Gold Fund: 5%'
        ]
    };

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(allocationData),
            datasets: [{
                data: Object.values(allocationData),
                backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#5D878F'],
                borderWidth: 4,
                borderColor: '#ffffff',
                hoverBorderWidth: 6,
                hoverOffset: 15
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '40%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 25,
                        font: {
                            size: 16,
                            weight: '600'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: 'white',
                    bodyColor: 'white',
                    borderColor: '#1FB8CD',
                    borderWidth: 2,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            const category = context.label;
                            const percentage = context.parsed;
                            const breakdown = breakdownData[category];
                            
                            let result = [`${category}: ${percentage}%`, ''];
                            if (breakdown) {
                                result = result.concat(breakdown);
                            }
                            return result;
                        }
                    }
                }
            },
            animation: {
                animateRotate: true,
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });
}

// Portfolio Growth Chart (15-year projection)
function createGrowthChart() {
    const ctx = document.getElementById('growthChart');
    if (!ctx) return;

    // Exact Excel data for 15-year projection
    const years = [
        2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 
        2033, 2034, 2035, 2036, 2037, 2038, 2039
    ];
    
    const portfolioValues = [
        3.19, 3.61, 4.03, 4.60, 5.12, 5.68, 6.02, 6.61, 7.25,
        6.71, 7.45, 12.62, 13.83, 15.14, 16.58, 18.14
    ];

    const growthRates = [
        0, 11.2, 11.2, 11.2, 11.2, 11.2, 10.0, 10.0, 10.0,
        10.0, 10.0, 9.0, 9.0, 9.0, 9.0, 9.0
    ];

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: years,
            datasets: [{
                label: 'Portfolio Value (₹ Crores)',
                data: portfolioValues,
                backgroundColor: function(context) {
                    const value = context.parsed.y;
                    if (value > 15) return '#1FB8CD';
                    if (value > 10) return '#FFC185';
                    if (value > 5) return '#5D878F';
                    return '#B4413C';
                },
                borderColor: '#1FB8CD',
                borderWidth: 2,
                borderRadius: 6,
                borderSkipped: false,
                hoverBackgroundColor: '#0FA0B3',
                hoverBorderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    titleColor: 'white',
                    bodyColor: 'white',
                    borderColor: '#1FB8CD',
                    borderWidth: 2,
                    cornerRadius: 8,
                    callbacks: {
                        title: function(context) {
                            return `Year ${context[0].label}`;
                        },
                        label: function(context) {
                            const year = context.dataIndex;
                            const value = context.parsed.y;
                            const growthRate = growthRates[year];
                            
                            return [
                                `Portfolio Value: ₹${value} Crores`,
                                `Growth Rate: ${growthRate}%`,
                                `Target Achievement Progress`
                            ];
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Portfolio Value (₹ Crores)',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    ticks: {
                        callback: function(value) {
                            return '₹' + value + ' Cr';
                        }
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Year',
                        font: {
                            size: 14,
                            weight: 'bold'
                        }
                    },
                    grid: {
                        display: false
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update active navigation
                updateActiveNavigation(targetId);
            }
        });
    });
}

// Update active navigation based on scroll position
function updateActiveNavigation(activeId) {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === activeId) {
            link.classList.add('active');
        }
    });
}

// Setup scroll animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animate progress bars when they come into view
                if (entry.target.classList.contains('goal-card')) {
                    animateProgressBar(entry.target);
                }
                
                // Animate counters when they come into view
                if (entry.target.classList.contains('total-value-card')) {
                    animateCounters(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.goal-card, .portfolio-chart-section, .allocation-chart-section, .projection-chart-section, .category-section, .ips-card, .team-card, .total-value-card');
    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

// Animate progress bars
function animateProgressBar(card) {
    const progressFill = card.querySelector('.progress-fill');
    if (progressFill) {
        const targetWidth = progressFill.style.width;
        progressFill.style.width = '0%';
        
        setTimeout(() => {
            progressFill.style.width = targetWidth;
        }, 200);
    }
}

// Setup initial progress bars with correct percentages
function setupProgressBars() {
    const progressBars = [
        { selector: '.goal-card:nth-child(1) .progress-fill', width: '5.8%' },
        { selector: '.goal-card:nth-child(2) .progress-fill', width: '0%' },
        { selector: '.goal-card:nth-child(3) .progress-fill', width: '3.5%' }
    ];
    
    progressBars.forEach(bar => {
        const element = document.querySelector(bar.selector);
        if (element) {
            element.style.width = bar.width;
        }
    });
}

// Counter animations
function animateCounters(element) {
    const valueElements = element.querySelectorAll('.total-amount');
    
    valueElements.forEach(valueElement => {
        const text = valueElement.textContent;
        if (text.includes('₹3,18,96,000')) {
            animateNumber(valueElement, 0, 31896000, '₹', '', 2000, true);
        }
    });
}

// Enhanced number animation function
function animateNumber(element, start, end, prefix = '', suffix = '', duration = 1000, isCurrency = false) {
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(start + (end - start) * easeOutQuart);
        
        // Format number based on type
        let formattedValue;
        if (isCurrency && currentValue >= 10000000) {
            // Format as crores for large currency values
            const crores = (currentValue / 10000000).toFixed(2);
            formattedValue = `${currentValue.toLocaleString('en-IN')}`;
        } else if (currentValue >= 1000) {
            formattedValue = currentValue.toLocaleString('en-IN');
        } else {
            formattedValue = currentValue.toString();
        }
        
        element.textContent = prefix + formattedValue + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

// Navigation highlighting based on scroll
function setupNavigation() {
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.section[id]');
        const headerHeight = document.querySelector('.header').offsetHeight;
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 100;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = '#' + section.getAttribute('id');
            }
        });
        
        if (currentSection) {
            updateActiveNavigation(currentSection);
        }
    });
}

// Setup counter animations for total portfolio value
function setupCounterAnimations() {
    const totalAmountElement = document.querySelector('.total-amount');
    if (totalAmountElement) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate the total portfolio value
                    setTimeout(() => {
                        animateNumber(totalAmountElement, 0, 31896000, '₹', '', 2500, true);
                    }, 500);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(totalAmountElement);
    }
}

// Interactive chart hover effects
function addChartInteractivity() {
    // Add click handlers for portfolio sections
    document.addEventListener('click', function(e) {
        if (e.target.closest('.fund-item')) {
            const fundItem = e.target.closest('.fund-item');
            const fundName = fundItem.textContent;
            console.log(`Selected fund: ${fundName}`);
            
            // Add visual feedback
            fundItem.style.transform = 'scale(1.02)';
            setTimeout(() => {
                fundItem.style.transform = '';
            }, 200);
        }
    });
}

// Utility functions
function formatCurrency(amount) {
    if (amount >= 10000000) {
        return '₹' + (amount / 10000000).toFixed(2) + ' Cr';
    } else if (amount >= 100000) {
        return '₹' + (amount / 100000).toFixed(2) + ' L';
    } else {
        return '₹' + amount.toLocaleString('en-IN');
    }
}

function calculateProgressPercentage(current, target) {
    return Math.round((current / target) * 100 * 10) / 10; // Round to 1 decimal
}

// Enhanced error handling
function handleErrors() {
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
        
        // Fallback for missing charts
        if (e.error.message && e.error.message.includes('Chart')) {
            console.log('Chart.js loading issue detected, attempting fallback...');
        }
    });
}

// Performance optimization
function optimizePerformance() {
    // Debounce scroll events
    let scrollTimeout;
    const originalScrollHandler = window.onscroll;
    
    window.onscroll = function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            if (originalScrollHandler) {
                originalScrollHandler();
            }
        }, 16); // ~60fps
    };
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add delay to ensure Chart.js is loaded
    setTimeout(() => {
        setupCounterAnimations();
        addChartInteractivity();
        handleErrors();
        optimizePerformance();
    }, 100);
});

// Add resize handler for responsive chart adjustments
window.addEventListener('resize', function() {
    // Charts will automatically resize due to responsive: true option
    const charts = Chart.getChart ? Object.values(Chart.instances || {}) : [];
    charts.forEach(chart => {
        if (chart && chart.resize) {
            setTimeout(() => chart.resize(), 100);
        }
    });
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        const focusableElements = document.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else {
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    }
});

// Add tooltips for financial terms
function addFinancialTooltips() {
    const tooltips = {
        'ELSS': 'Equity Linked Savings Scheme - Tax saving mutual funds with 3-year lock-in',
        'PPF': 'Public Provident Fund - 15-year tax-free investment scheme',
        'FD': 'Fixed Deposit - Guaranteed return investment with capital protection',
        'Flexi Cap': 'Flexible market capitalization funds that can invest across all market caps'
    };
    
    Object.keys(tooltips).forEach(term => {
        const elements = document.querySelectorAll(`*:contains("${term}")`);
        elements.forEach(element => {
            element.title = tooltips[term];
        });
    });
}

// Initialize tooltips after DOM load
setTimeout(() => {
    addFinancialTooltips();
}, 1000);

// Export functions for testing (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        formatCurrency,
        calculateProgressPercentage,
        animateNumber
    };
}

// Performance monitoring
function logPerformance() {
    if (window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        console.log('Portfolio app load time:', loadTime + 'ms');
        
        // Log chart rendering time
        const chartElements = document.querySelectorAll('canvas');
        console.log(`Rendered ${chartElements.length} charts successfully`);
    }
}

// Log performance after complete load
window.addEventListener('load', () => {
    setTimeout(logPerformance, 2000);
});

// Service worker registration for offline capability (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Register service worker if needed for offline functionality
        console.log('Service worker support available');
    });
}